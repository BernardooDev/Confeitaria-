import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:3306/produtos")
      .then((response) => {
        setProdutos(response.data.produtos);
      })
      .catch((error) => {
        console.error("Erro ao carregar os produtos:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Excluir o produto aqui
    // Conecte à sua API de exclusão posteriormente
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (confirmDelete) {
      setProdutos(produtos.filter((produto) => produto.id !== id));
      // Faça a chamada para a API de exclusão aqui (axios.delete...)
    }
  };

  return (
    <>
      <h2>Produtos</h2>
      <div className="produtos-container">
        {produtos.map((produto) => (
          <div className="produto-card" key={produto.id}>
            <button
              className="delete-btn"
              onClick={() => handleDelete(produto.id)}
            >
              ×
            </button>
            <h3>{produto.nome_produto}</h3>
            <p className="produto-preco">R$ {produto.preco_produto}</p>
            <p>{produto.descricao_produto}</p>
          </div>
        ))}
      </div>
    </>
  );
}
