import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ItensPage = () => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/itens");
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao obter itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItens();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen flex-col items-center justify-center bg-gray-100">
      <header className="text-center pt-6 pb-10 bg-white shadow-md w-full relative">
        <Link to="/" className="absolute left-10 top-6 text-blue-500 hover:underline">
          <FontAwesomeIcon icon={faArrowLeft} className="text-pink-500 text-2xl" />
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Itens</h1>
        <p className="text-lg text-gray-600 mt-2">Lista de todos os itens disponíveis</p>
      </header>

      <main className="mt-10 w-full max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itens.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-lg text-gray-600">Preço: {item.price}</p>
              <p className="text-lg text-gray-600">Disponibilidade: {item.disponivel ? "Disponível" : "Encomenda"}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ItensPage;
