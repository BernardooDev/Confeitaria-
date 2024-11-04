import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Pedidos() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  if (loading) return <div>Carregando...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="userOrders">
      <h1>Pedidos:</h1>
      <div className="PedidoMain">
        {userData?.pedido && userData.pedido.length > 0 ? (
          userData.pedido.map((pedido) => {
            const formattedDate = new Date(pedido.created_at).toLocaleDateString(
              "pt-BR"
            );
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
              </div>
            );
          })
        ) : (
          <h2>Nenhum pedido realizado.</h2>
        )}
      </div>
    </div>
  );
}
