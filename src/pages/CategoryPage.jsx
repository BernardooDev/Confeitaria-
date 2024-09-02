import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ItemCategoria from "../components/ItemCategoria";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CategoryPage = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(
          `http://junction.proxy.rlwy.net/api/categorias/${id}`
        );
        setCategoria(response.data.categoria);
        setItens(response.data.itens);
      } catch (error) {
        console.error("Erro ao obter categoria:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoria();
  }, [id]);

  if (loading) return <div>Carregando...</div>;

  if (!categoria) return <div>Categoria não encontrada</div>;

  return (
    <div className="min-h-screen flex-col items-center justify-center bg-gray-100">
      <header className="text-center pt-6 pb-10 bg-white shadow-md w-full relative">
        <Link to="/" className="absolute left-10 top-6 text-blue-500 hover:underline">
        <FontAwesomeIcon icon={faArrowLeft} className="text-pink-500 text-2xl" />
        </Link>
        <h1 className="text-5xl font-bold text-gray-800 mt-4">
          {categoria.name}
        </h1>
        <p className="text-lg text-gray-600 mt-2">{categoria.descricao}</p>
      </header>

      <main className="mt-10 w-full max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itens.map((item) => (
            <ItemCategoria key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
