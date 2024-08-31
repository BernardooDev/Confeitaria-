// src/pages/LandingPage.js
import React from 'react';
import axios from 'axios';

const LandingPage = () => {
  const criarPedido = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/pedidos', {
        cliente: 'Nome do Cliente',
        itens: [{ item: 'Bolo de Chocolate', quantidade: 1 }],
      });
      console.log('Pedido criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Bem-vindo à Confeitaria</h1>
        <p>Delícias feitas com amor, entregues na sua porta.</p>
        <button className="cta-button" onClick={criarPedido}>
          Faça seu pedido
        </button>
      </header>
    </div>
  );
}

export default LandingPage;
