import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Perfil/Perfil";
import "../../styles/Login/index.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ftlkmfucihajaafuvsqy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGttZnVjaWhhamFhZnV2c3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTkxNDYsImV4cCI6MjA0NDA3NTE0Nn0.hTdTi3a8lyVVbcSLtpWsEpmbAaj9vjn6HBbtLmAjdu8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Captura o token armazenado
    if (token) {
      navigate("/perfil");
      return; 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa mensagens de erro anteriores

    // Valida os campos
    if (!email || !password) {
      setErrorMessage('E-mail e senha são obrigatórios.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3306/auth/login', {
        email,
        senha: password,
      });
      console.log('Login bem-sucedido:', response.data.id);
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token); 
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error);
      setErrorMessage('Credenciais inválidas.');
    }
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleLogin} className="LoginForm">
        <h2>{errorMessage && <p>{errorMessage}</p>}</h2>
        <h2>Login</h2>
        <div className="InputContainer">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
