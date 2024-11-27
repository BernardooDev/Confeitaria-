import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Endereco from "./Endereco";
import Pedidos from "./Pedidos";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Usuário não autenticado.");
          setLoading(false);
          navigate("/");
          return;
        }
        const response = await axios.get("http://localhost:3306/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        setErrorMessage("Erro ao carregar perfil do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleAdminNavigate = () => {
    navigate("/admin");
  };

  const toggleAddressForm = () => setShowAddressForm(!showAddressForm);

  const handleDeleteAddress = async (clienteId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3306/perfil/endereco_cliente/${clienteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData((prevData) => ({
        ...prevData,
        endereco: prevData.endereco.filter(end => end.cliente_id !== clienteId),
      }));
    } catch (error) {
      console.error("Erro ao excluir endereço:", error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="ProfileMain">
      {userData.tipo_cliente === 1 && (
        <button onClick={handleAdminNavigate} className="btn-admin">
          Portal Admin
        </button>
      )}
      <div className="userLogout">
        <h2>Deslogar</h2>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="btn-admin"
          aria-label="Logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
      <div className="UserProfile">
        <div className="ProfileCard">
          <h1>Informações do Cadastro</h1>
          <div className="userDetails">
            <h1>
              <strong>Nome:</strong> {userData?.nome}
            </h1>
            <h1>
              <strong>Email:</strong> {userData?.email}
            </h1>
            <h1>
              <strong>Telefone:</strong> {userData?.telefone}
            </h1>
            <div className="userAddress">
              <h1>Endereço:</h1>
              {userData?.endereco && userData.endereco.length > 0 ? (
                userData.endereco.map((endereco, index) => (
                  <div key={index} className="singleAddress">
                    <p>
                      <strong>Rua:</strong> {endereco.rua_endereco}
                    </p>
                    <p>
                      <strong>Número:</strong> {endereco.numero_endereco}
                    </p>
                    <p>
                      <strong>Bairro:</strong> {endereco.bairro_endereco}
                    </p>
                    <p>
                      <strong>CEP:</strong> {endereco.cep_endereco}
                    </p>
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteAddress(endereco.cliente_id)}
                    >
                      Excluir Endereço
                    </button>
                  </div>
                ))
              ) : (
                <p>
                  <strong>
                    Nenhum endereço disponível. Adicione um novo abaixo:
                  </strong>
                </p>
              )}
              {/* Exibe o botão "Adicionar Endereço" apenas se não houver endereços */}
              {userData?.endereco?.length === 0 && !showAddressForm && (
                <button
                  className="ButtonAddAddress"
                  onClick={toggleAddressForm}
                >
                  Adicionar Endereço
                </button>
              )}
              {showAddressForm && (
                <Endereco onClose={() => setShowAddressForm(false)} />
              )}
            </div>
          </div>
          <Pedidos />
        </div>
      </div>
    </div>
  );
};

export default Main;
