const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlerwares/authMiddleware");
const supabase = require("../db/supabase");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: userData, error } = await supabase
      .from("cliente")
      .select("nome, email,senha,telefone, tipo_cliente")
      .eq("id", userId)
      .single();

    const { data: enderecoData, error: enderecoError } = await supabase
      .from("endereco_cliente")
      .select(
        "rua_endereco, numero_endereco, bairro_endereco, cep_endereco, cliente_id"
      )
      .eq("cliente_id", userId);

    const { data: pedidoData, error: pedidoError } = await supabase
      .from("pedido_cliente")
      .select(
        "id, created_at,valor_total,cliente_id, forma_entrega, pedido_status, pedido_produtos"
      )
      .eq("cliente_id", userId);

    if (error || !userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({
      nome: userData.nome,
      email: userData.email,
      telefone: userData.telefone,
      senha: userData.senha,
      tipo_cliente: userData.tipo_cliente,
      pedido: pedidoData,
      endereco: enderecoData,
      message: "Perfil carregado com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao buscar perfil do usuário:", err);
    res.status(500).json({ message: "Erro ao carregar o perfil do usuário" });
  }
});

router.post("/endereco_cliente", authenticateToken, async (req, res) => {
  const { rua_endereco, numero_endereco, bairro_endereco, cep_endereco } =
    req.body;
  const userId = req.user.id;

  const { data: clienteData, error: clienteError } = await supabase
    .from("cliente")
    .select("id")
    .eq("id", userId)
    .single();

  if (clienteError || !clienteData) {
    console.error("Cliente não encontrado:", clienteError);
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  const { data: userAddress, error } = await supabase
    .from("endereco_cliente")
    .insert([
      {
        rua_endereco,
        numero_endereco,
        bairro_endereco,
        cep_endereco,
        cliente_id: userId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao inserir dados:", error);
    return res
      .status(500)
      .json({ message: "Erro ao adicionar endereço", error });
  }
  res.status(201).json({ endereco: userAddress });
});

router.delete("/endereco_cliente", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const { data: enderecoData, error: enderecoError } = await supabase
      .from("endereco_cliente")
      .select("*")
      .eq("cliente_id", userId)
      .single();

    if (enderecoError || !enderecoData) {
      console.error(
        "Endereço não encontrado ou não pertence ao cliente:",
        enderecoError
      );
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    const { error } = await supabase
      .from("endereco_cliente")
      .delete()
      .eq("id", enderecoData.id);

    if (error) {
      console.error("Erro ao excluir endereço:", error);
      return res.status(500).json({ message: "Erro ao excluir endereço" });
    }
    res.status(200).json({ message: "Endereço excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir endereço:", err);
    res.status(500).json({ message: "Erro ao excluir endereço" });
  }
});

module.exports = router;
