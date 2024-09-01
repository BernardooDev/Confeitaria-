import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full py-10 bg-white shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Bem-vindo à Senhorita Confeitaria</h1>
          <p className="text-lg text-gray-600 mt-4">Delícias feitas com amor, entregues na sua porta.</p>
          <br></br>
          <Link 
            className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300" 
            to="/itens"
          >
            Faça seu pedido
          </Link>
        </div>
      </header>

      <main className="mt-10 w-full max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.map(categoria => (
            <Link 
              key={categoria.id}
              to={`/categorias/${categoria.id}`}
              className="bg-white p-4 shadow-md rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <h3 className="text-xl font-medium text-gray-800">{categoria.name}</h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
