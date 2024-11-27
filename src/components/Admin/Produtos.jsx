import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3306/produtos")
      .then((response) => {
        setProdutos(response.data.produtos);
      })
      .catch((error) => {
        console.error("Erro ao carregar os produtos:", error);
      });
  }, []);

  const toggleDisponibilidade = async (id, disponivelAtual) => {
    const novoStatus = !disponivelAtual;

    try {
      const response = await axios.put(`http://localhost:3306/produtos/${id}`, {
        produto_disponivel: novoStatus,
      });

      if (response.status === 200) {
        setProdutos((produtos) =>
          produtos.map((produto) =>
            produto.id === id ? { ...produto, produto_disponivel: novoStatus } : produto
          )
        );
      } else {
        console.error(`Falha ao atualizar produto ${id} no backend.`);
      }
    } catch (error) {
      console.error(`Erro ao tentar atualizar produto ${id}:`, error);
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <div className="produtos-container">
        {produtos.map((produto) => (
          <div className="produto-card" key={produto.id}>
            <img src={produto.url_imagem} alt={produto.nome_produto} className="produto-imagem" />
            <h3>{produto.nome_produto}</h3>
            <p className="produto-descricao">{produto.descricao_produto}</p>
            <p className="produto-preco">R$ {produto.preco_produto.toFixed(2)}</p>
            {produto.preco_com_desconto && (
              <p className="produto-desconto">
                Promoção: R$ {produto.preco_com_desconto} ({produto.promocao_descricao})
              </p>
            )}
            <button
              className={`toggle-btn ${produto.produto_disponivel ? "ativo" : "inativo"}`}
              onClick={() => toggleDisponibilidade(produto.id, produto.produto_disponivel)}
            >
              {produto.produto_disponivel ? "Disponível" : "Indisponível"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
