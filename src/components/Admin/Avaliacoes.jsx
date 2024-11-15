import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get("http://localhost:3306/avaliacoes");
        setAvaliacoes(response.data.data); // Assumindo que a resposta é { data: [...] }
        setLoading(false);
        console.log(response.data.data);
      } catch (err) {
        setError("Erro ao carregar as avaliações.");
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3306/avaliacoes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Caso esteja usando token JWT
        },
      });
      setAvaliacoes(avaliacoes.filter((avaliacao) => avaliacao.id !== id));
    } catch (err) {
      setError("Erro ao excluir a avaliação.");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Avaliações</h2>
      <div className="avaliacoes-container">
        {avaliacoes.map((avaliacao) => (
          <div key={avaliacao.id} className="avaliacao-card">
            <div className="delete-btn" onClick={() => handleDelete(avaliacao.id)}>
              x
            </div>
            <p className="nota">
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
            </p>
            <div className="cliente-info">
              <h4>Cliente:</h4>
              <p>
                <strong>Nome:</strong> {avaliacao.cliente.nome}
              </p>
              <p>
                <strong>E-mail:</strong> {avaliacao.cliente.email}
              </p>
            </div>
            <div className="pedido-info">
              <h4>Pedido:</h4>
              <p>
                <strong>ID do Pedido:</strong> {avaliacao.pedido.id}
              </p>
              <p>
                <strong>Data do Comentário:</strong>{" "}
                {new Date(avaliacao.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h1>Comentário</h1>
              <p>{avaliacao.comentario}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
