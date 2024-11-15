import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Pedidos() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [avaliacao, setAvaliacao] = useState({
    nota: 1,
    comentario: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Usuário não autenticado.");
          setLoading(false);
          return;
        }
        const response = await axios.get("http://localhost:3306/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        setErrorMessage("Erro ao carregar perfil do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSelectPedido = (pedidoId) => {
    setSelectedPedido(pedidoId);
    setModalOpen(true); //
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAvaliacao({
      ...avaliacao,
      [name]: value,
    });
  };

  const handleSubmitAvaliacao = async (e) => {
    e.preventDefault();

    // Verificação de comentário
    if (!avaliacao.comentario) {
      alert("Por favor, adicione um comentário.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Alterando 'pedidoId' para 'pedido_cliente' para alinhar com o campo da tabela
      const response = await axios.post(
        "http://localhost:3306/avaliacoes", // Endpoint correto
        {
          pedido_cliente: selectedPedido, // Alterando o nome do campo
          nota: avaliacao.nota,
          comentario: avaliacao.comentario,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Autorização com Bearer token
        }
      );

      // Sucesso ao enviar avaliação
      alert("Avaliação enviada com sucesso!");
      setAvaliacao({ nota: 1, comentario: "" });
      setModalOpen(false);
      setSelectedPedido(null);
      window.location.reload(); 
    } catch (error) {
      console.error("Erro ao enviar avaliação", error);
      alert("Erro ao enviar avaliação.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) return <div>Carregando...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="userOrders">
      <h1>Pedidos:</h1>
      <div className="PedidoMain">
        {userData?.pedido && userData.pedido.length > 0 ? (
          userData.pedido.map((pedido) => {
            const formattedDate = new Date(
              pedido.created_at
            ).toLocaleDateString("pt-BR");
            return (
              <div key={pedido.id} className="SinglePedido">
                <div className="PedidoContainer">
                  <div className="PedidoHeader">
                    <h3>
                      <strong>Pedido: {pedido.id}</strong>
                    </h3>
                    <h3>
                      <strong>Data: {formattedDate}</strong>
                    </h3>
                  </div>
                  <div className="PedidoMoney">
                    <h3>
                      <strong>
                        Forma de Entrega:{" "}
                        {pedido.forma_entrega === 2 ? "Retirada" : "Encomenda"}
                      </strong>
                    </h3>
                    <h3>
                      <strong>
                        Status:{" "}
                        {pedido.pedido_status === 2 ? "Confirmado" : "Enviado"}
                      </strong>
                    </h3>
                  </div>
                  <h3>
                    <strong>Valor: R${pedido.valor_total}</strong>
                  </h3>
                </div>
                <div className="PedidoDetails">
                  {pedido.pedido_produtos.map((produto, index) => (
                    <div className="userPedidos" key={index}>
                      <div>Produto: {produto.nome}</div>
                      <div>Quantidade: {produto.quantidade}</div>
                      <div>Valor: R${produto.preco * produto.quantidade}</div>
                    </div>
                  ))}
                </div>
                {pedido.avaliacao ? (
                  <div className="avaliacao">
                    <div className="nota">
                      <strong>Nota: </strong>
                      <div className="stars">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={`star ${
                              index < pedido.avaliacao.nota ? "filled" : ""
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Comentário:</strong> {pedido.avaliacao.comentario}
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn-admin"
                    onClick={() => handleSelectPedido(pedido.id)}
                  >
                    Avaliar Pedido
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <h2>Nenhum pedido realizado.</h2>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeModal}
            >
              x
            </button>
            <h2>Avalie seu pedido</h2>
            <form onSubmit={handleSubmitAvaliacao}>
              <div className="modal-input-group">
                <label htmlFor="nota">Nota:</label>
                <select
                  id="nota"
                  name="nota"
                  value={avaliacao.nota}
                  onChange={handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="modal-input-group">
                <label htmlFor="comentario">Comentário:</label>
                <textarea
                  id="comentario"
                  name="comentario"
                  value={avaliacao.comentario}
                  onChange={handleInputChange}
                  rows="4"
                  cols="50"
                ></textarea>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="modal-submit-btn">
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
