const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlerwares/authMiddleware");
const supabase = require("../db/supabase");

router.get("/", async (req, res) => {
  try {
    const { data: avaliacoes, error: errorAvaliacao } = await supabase
      .from("avaliacoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (errorAvaliacao) {
      console.error("Erro ao buscar avaliações:", errorAvaliacao);
      return res.status(500).json({ message: "Erro ao buscar avaliações" });
    }

    const avaliacoesComDetalhes = await Promise.all(
      avaliacoes.map(async (avaliacao) => {
        const { data: pedido, error: errorPedido } = await supabase
          .from("pedido_cliente")
          .select("*")
          .eq("id", avaliacao.pedido_cliente_id)
          .single();

        if (errorPedido) {
          console.error("Erro ao buscar pedido:", errorPedido);
          return { ...avaliacao, pedido: null };
        }

        const { data: cliente, error: errorCliente } = await supabase
          .from("cliente")
          .select("*")
          .eq("id", avaliacao.cliente_id)
          .single();

        if (errorCliente) {
          console.error("Erro ao buscar cliente:", errorCliente);
          return { ...avaliacao, pedido, cliente: null };
        }

        return {
          ...avaliacao,
          pedido,
          cliente,
        };
      })
    );

    res.status(200).json({
      data: avaliacoesComDetalhes,
    });
  } catch (error) {
    console.error("Erro interno ao buscar detalhes das avaliações:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao buscar detalhes das avaliações" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { pedido_cliente, nota, comentario } = req.body;

    console.log(userId, nota, comentario, pedido_cliente);

    if (!pedido_cliente || !nota || !comentario) {
      return res.status(400).json({
        message: "Dados inválidos. Todos os campos são obrigatórios.",
      });
    }

    const { data, error } = await supabase.from("avaliacoes").insert([
      {
        cliente_id: userId,
        nota: nota,
        comentario: comentario,
        pedido_cliente_id: pedido_cliente,
      },
    ]);

    if (error) {
      console.error("Erro ao inserir avaliação:", error);
      return res
        .status(500)
        .json({ message: "Erro ao salvar a avaliação", error });
    }

    res.status(200).json({ message: "Avaliação salva com sucesso!", data });
  } catch (err) {
    console.error("Erro interno do servidor:", err);
    res
      .status(500)
      .json({ message: "Erro ao processar a avaliação", error: err });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; 

    const { data: avaliacao, error: errorAvaliacao } = await supabase
      .from("avaliacoes")
      .select("*")
      .eq("id", id)
      .single();

    if (errorAvaliacao || !avaliacao) {
      console.error("Avaliação não encontrada:", errorAvaliacao);
      return res.status(404).json({ message: "Avaliação não encontrada" });
    }

    if (avaliacao.cliente_id !== userId) {
      return res.status(403).json({
        message: "Você não tem permissão para excluir esta avaliação",
      });
    }
    const { error: deleteError } = await supabase
      .from("avaliacoes")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Erro ao excluir avaliação:", deleteError);
      return res
        .status(500)
        .json({ message: "Erro ao excluir a avaliação", error: deleteError });
    }

    res.status(200).json({ message: "Avaliação excluída com sucesso!" });
  } catch (err) {
    console.error("Erro interno ao excluir avaliação:", err);
    res
      .status(500)
      .json({ message: "Erro ao processar a exclusão da avaliação", error: err });
  }
});

module.exports = router;
