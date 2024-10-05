import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login/index.css";

const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      navigate('/perfil'); 
      return; 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:3306/auth/registro", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); 
      setIsLoggedIn(true);
      navigate("/perfil"); 
      window.location.reload();
    } catch (error) {
      console.error("Erro no registro:", error);
      setErrorMessage("Erro ao tentar registrar o usuário.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
  };

  return (
    <div className="RegisterContainer">
      {isLoggedIn ? (
        <div className="ProfileContainer">
          <h2>Bem-vindo ao seu perfil!</h2>
          <p>Detalhes do cliente...</p>
          <button onClick={handleLogout} className="LogoutButton">
            Sair
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="RegisterForm">
          <h2>Registro</h2>
          {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
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
          <button type="submit" className="RegisterButton">
            Registrar
          </button>
          <p className="LoginPrompt">
            Já possui conta? <Link to="/login">Faça login</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Main;
