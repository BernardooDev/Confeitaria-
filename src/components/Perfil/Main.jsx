import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Perfil/index.css";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Token não encontrado, redirecionando para o login.");
        navigate('/login'); // Redireciona se não houver token
        return; 
      }
      try {
        const response = await axios.get("http://localhost:3306/perfil", {
          headers: { authorization: `Bearer ${token}` },
        });
        setUserData(response.data); 
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.warn("Token inválido ou expirado, redirecionando para o login.");
          setErrorMessage("Token inválido ou expirado. Faça login novamente.");
          navigate('/login'); // Redireciona se o token for inválido
        } else {
          setErrorMessage("Erro ao buscar informações do perfil.");
        }
        console.error(error);
      }
    };
  
    fetchProfile();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!userData) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="ProfileContainer">
      <h2>Bem-vindo ao seu perfil!</h2>
      <p>Detalhes do cliente...</p>
      {userData.username}
      <br></br>
      <button onClick={handleLogout} className="LogoutButton"> Sair </button>
    </div>
  );
};

export default Main;
