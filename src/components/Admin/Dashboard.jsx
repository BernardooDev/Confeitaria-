import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [topCliente, setTopCliente] = useState(null);
  const [topProduto, setTopProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteResponse = await axios.get(
          "http://localhost:3306/dashboard/clientes"
        );
        const produtoResponse = await axios.get(
          "http://localhost:3306/dashboard/produtos"
        );

        setTopCliente(clienteResponse.data);
        setTopProduto(produtoResponse.data);
      } catch (error) {
        setError("Erro ao buscar dados: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashboard-container">
        <div className="dashboard-item">
          <h3 className="item-title">Cliente que mais fez pedidos</h3>
          {topCliente ? (
            <p className="item-info">
              <span className="info-label">ID:</span> {topCliente.cliente_id}{" "}
              <br />
              <span className="info-label">Total de Pedidos:</span>{" "}
              {topCliente.total}
            </p>
          ) : (
            <p className="no-data">Nenhum cliente encontrado.</p>
          )}
        </div>

        <div className="dashboard-item">
          <h3 className="item-title">Produto mais vendido</h3>
          {topProduto ? (
            <p className="item-info">
              <span className="info-label">ID:</span> {topProduto.id} <br />
              <span className="info-label">Nome:</span> {topProduto.nome} <br />
              <span className="info-label">Total Vendido:</span>{" "}
              {topProduto.total}
            </p>
          ) : (
            <p className="no-data">Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
}
