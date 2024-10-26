const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

router.get("/", async (req, res) => {
  // Query para buscar todos os clientes
  const { data: clientes, error: clienteError } = await supabase
    .from("cliente")
    .select("*");

  if (clienteError || !clientes) {
    console.error("Erro ao buscar clientes:", clienteError);
    return res.status(404).json({ message: "Clientes não encontrados" });
  }

  // Armazena os IDs dos clientes em um array
  const clienteIds = clientes.map(cliente => cliente.id);
  
  // Faz a query para buscar os pedidos baseados nos IDs dos clientes
  const { data: pedidos, error: pedidosError } = await supabase
    .from("pedido_cliente")
    .select("*")
    .in("cliente_id", clienteIds);  // Filtra os pedidos com base nos IDs dos clientes

  if (pedidosError) {
    console.error("Erro ao buscar pedidos:", pedidosError);
    return res.status(500).json({ message: "Erro ao buscar pedidos" });
  }

  // Associa os pedidos aos clientes
  const clientesComPedidos = clientes.map(cliente => ({
    ...cliente,
    pedidos: pedidos.filter(pedido => pedido.cliente_id === cliente.id),
  }));

  // Retorna os clientes com seus pedidos
  res.status(200).json({
    clientes: clientesComPedidos,
    message: "Clientes e pedidos carregados com sucesso!",
  });
});

module.exports = router;