import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-customPink mb-4">Página não encontrada</h1>
      <p className="text-gray-700 text-lg mb-6">Ops! A página que você está procurando não existe.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-customPink text-white px-6 py-2 rounded-lg hover:customPink transition ease-in-out duration-200"
      >
        Voltar à Página Inicial
      </button>
    </div>
  );
}

export default NotFound;
