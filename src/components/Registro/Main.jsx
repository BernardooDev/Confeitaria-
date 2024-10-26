import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login/index.css";

const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Novo estado para idade
  const [telefone, setTelefone] = useState(""); // Novo estado para endereço
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/perfil");
  //     return;
  //   }
  // }, [navigate]);

  const registrarCliente = async (e) => {
    e.preventDefault();

    const supabaseUrl = "https://ftlkmfucihajaafuvsqy.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGttZnVjaWhhamFhZnV2c3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTkxNDYsImV4cCI6MjA0NDA3NTE0Nn0.hTdTi3a8lyVVbcSLtpWsEpmbAaj9vjn6HBbtLmAjdu8";

    try {
      const response = await axios.post(
        `${supabaseUrl}/rest/v1/cliente`, // Supabase REST endpoint
        {
          nome: username,
          email,
          senha: password,
          telefone,
          tipo_cliente: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
          },
        }
      );

      console.log("Cliente registrado:", response.data);
      navigate("/login")
    } catch (error) {
      console.error("Erro ao registrar cliente:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="MainContent">
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
          <form onSubmit={registrarCliente} className="RegisterForm">
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
            <div className="InputContainer">
              <label htmlFor="idade">Email</label>
              <input
                type="email"
                id="idade"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="InputContainer">
              <label htmlFor="endereco">Telefone</label>
              <input
                type="tel"
                id="endereco"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
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
    </div>
  );
};

export default Main;
