import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Perfil/index.css";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (!token) {
      console.warn("Token não encontrado, redirecionando para o login.");
      navigate("/login"); // Redireciona se não houver token
      return;
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Carrega os dados do usuário armazenados
    } else {
      console.warn("Dados do usuário não encontrados.");
      navigate("/login"); // Redireciona se não houver dados do usuário
    }
  }, [navigate]);

  if (!userData) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="ProfileMain">
      <div className="UserProfile">
        <div className="ProfileCard">
          <h1>Detalhes do Perfil:</h1>
          <div className="userDetails">
            <h1>
              <strong>Nome:</strong> {userData.username}
            </h1>
            <h1>
              <strong>Idade:</strong> {userData.idade}
            </h1>
            <h1>
              <strong>Endereço:</strong> {userData.endereco}
            </h1>
          </div>

          <div className="user-orders">
            <h1>Pedidos:</h1>
            {userData.pedidos.length > 0 ? (
              <ul>
                {userData.pedidos.map((pedido, index) => (
                  <li key={index}>{pedido}</li>
                ))}
              </ul>
            ) : (
              <p className="list-empty">Nenhum pedido encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
