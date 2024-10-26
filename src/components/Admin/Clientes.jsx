import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:3306/clientes");
        setClientes(response.data.clientes); // Assumindo que a resposta é { clientes: [...] }
        setLoading(false);
        console.log(response.data.clientes);
      } catch (err) {
        setError("Erro ao carregar os clientes.");
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Clientes</h2>
      <div className="clientes-container">
        {clientes.map((cliente) => (
          <>
            <div key={cliente.id} className="cliente-card">
              <h3>Nome: {cliente.nome}</h3>
              <p className="cliente-email">E-mail: {cliente.email}</p>
              <p className="cliente-telefone">Telefone: {cliente.telefone}</p>
              {cliente.telefone2 && (
                <p className="cliente-telefone2">
                  Telefone Secundário: {cliente.telefone2}
                </p>
              )}
              <p className="cliente-tipo">
                Tipo de Cliente: {cliente.tipo_cliente === 1 ? "Admin" : "User"}
              </p>
              <p className="cliente-created-at">
                Criado em: {new Date(cliente.created_at).toLocaleDateString()}
              </p>
              <button className="editar-btn">✏️</button>
              <div className="cliente-pedidos">
                <h4 className="pedidos-titulo">Pedidos:</h4>
                {cliente.pedidos.length > 0 ? (
                  <div className="pedidos-list">
                    {cliente.pedidos.map((pedido) => (
                      <div key={pedido.id} className="pedido">
                        <p>
                          <strong>ID do Pedido:</strong> {pedido.id}
                        </p>
                        <p>
                          <strong>Data do Pedido:</strong>{" "}
                          {new Date(pedido.created_at).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Valor Total:</strong> R${" "}
                          {pedido.valor_total.toFixed(2)}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {pedido.pedido_status === 2
                            ? "Finalizado"
                            : "Em andamento"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Esse cliente não possui pedidos.</p>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
