import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
        setCategoria(response.data);
      } catch (error) {
        console.error('Erro ao obter categoria:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [id]);

  if (loading) return <div>Carregando...</div>;

  if (!categoria) return <div>Categoria não encontrada</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="w-full max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{categoria.nome}</h1>
        <p className="text-lg text-gray-600">{categoria.descricao}</p>
      </main>
    </div>
  );
}

export default CategoryPage;
