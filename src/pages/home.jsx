// src/pages/LandingPage.js
import React from 'react';
import axios from 'axios';

const HomePage = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center py-10 bg-white shadow-md w-full">
        <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à Confeitaria</h1>
        <p className="text-lg text-gray-600 mt-4">Delícias feitas com amor, entregues na sua porta.</p>
        <button 
          className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300" 
          onClick={criarPedido}>
          Faça seu pedido
        </button>
      </header>
    </div>
  );
}

export default HomePage;
