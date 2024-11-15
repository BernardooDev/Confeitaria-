import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Main() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get("http://localhost:3306/avaliacoes");
        setAvaliacoes(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, []);

  if (loading) {
    return <p>Carregando avaliações...</p>;
  }

  return (
    <div className="avaliacoes-container">
      {avaliacoes.map((avaliacao) => (
        <div key={avaliacao.id} className="avaliacao-card">
          <p className="cliente-nome">Cliente: {avaliacao.cliente.nome}</p>
          <p className="cliente-email">Email: {avaliacao.cliente.email}</p>
          <div className="pedido-produtos">
            <h3>Produtos:</h3>
            <ul>
              {avaliacao.pedido.pedido_produtos.map((produto) => (
                <li key={produto.id} className="produto-item">
                  {produto.quantidade} - {produto.nome} - R$
                  {produto.preco.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div className="nota">
            <strong>Nota: </strong>
            <div className="stars">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`star ${index < avaliacao.nota ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="comentario">
            <strong>Comentário:</strong> {avaliacao.comentario}
          </p>
        </div>
      ))}
    </div>
  );
}
