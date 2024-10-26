import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminPanel from './AdminPanel';

export default function Main() {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            // Usuário não autenticado
            setErrorMessage("Usuário não autenticado.");
            console.log("Usuário não autenticado.");
            setLoading(false);
            navigate("/");
            return;
          }
  
          const response = await axios.get("http://localhost:3306/perfil", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          const userProfile = response.data;
  
          // Verifica o tipo de cliente
          if (userProfile.tipo_cliente !== 1) {
            setErrorMessage("Acesso negado: Você não é um administrador.");
            console.log("Acesso negado: Cliente não é administrador.");
            setLoading(false);
            navigate("/");
            return;
          }
  
          setUserData(userProfile); // Armazena os dados do usuário no estado
          console.log(userProfile);
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error);
          setErrorMessage("Erro ao carregar perfil do usuário.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [navigate]);
  
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    if (errorMessage) {
      return <p>{errorMessage}</p>;
    }
  
    return (
        <AdminPanel></AdminPanel>
    );
}
