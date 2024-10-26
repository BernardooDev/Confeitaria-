import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Buscar dados da API de pedidos
    axios
      .get("http://localhost:3306/pedido_cliente")
      .then((response) => {
        setPedidos(response.data.data); // Acessa o array "data" da resposta
      })
      .catch((error) => {
        console.error("Erro ao carregar os pedidos:", error);
      });
  }, [useEffect]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este pedido?"
    );
    if (confirmDelete) {
      setPedidos(pedidos.filter((pedido) => pedido.id !== id));
      // Faça a chamada para a API de exclusão aqui (axios.delete...)
    }
  };

  return (
    <>
      <h2>Pedidos</h2>
      <div className="pedidos-container">
        {pedidos.map((pedido) => (
          <div className="pedido-card" key={pedido.id}>
            <button
              className="delete-btn"
              onClick={() => handleDelete(pedido.id)}
            >
              x
            </button>
            <h3>Pedido #{pedido.id}</h3>
            <p>Data: {new Date(pedido.created_at).toLocaleString()}</p>
            <p>Valor total: R$ {pedido.valor_total}</p>
            <p>Forma de entrega: {pedido.forma_entrega === 2 ? "Retirada" : "Entrega"}</p>
            <p>Status: {pedido.pedido_status === 2 ? "Confirmado" : "Enviado"}</p>
            <h4>Produtos:</h4>
            <ul>
              {pedido.pedido_produtos.map((produto) => (
                <li key={produto.id}>
                  {produto.nome} - Quantidade: {produto.quantidade} - Preço: R$ {produto.preco}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
