import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Perfil/Perfil";
import "../../styles/Login/index.css";
import Perfil from "../Perfil/Perfil";

const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token'); // Captura o token armazenado
    if (token) {
      navigate('/perfil'); 
      return; // Impede a execução adicional
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3306/auth/login", {
        username,
        password,
      });
      const { token } = response.data; // Captura o token da resposta
      localStorage.setItem("token", token); // Armazena o token no localStorage
      navigate("/perfil"); // Redireciona para o perfil
      window.location.reload();
    } catch (error) {
      console.error("Erro no login:", error);
      // Exibir mensagem de erro
    }
     }
    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove o token
      setIsLoggedIn(false); // Atualiza o estado para deslogado
    };

    return (
      <div className="LoginContainer">
          <form onSubmit={handleSubmit} className="LoginForm">
            <h2>Login</h2>
            <div className="InputContainer">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="InputContainer">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="LoginButton">
              Entrar
            </button>
            <p className="RegisterPrompt">
              Não possui conta? <Link to="/registro">Registre-se</Link>
            </p>
          </form>
      </div>
    );
  };


export default Main;
