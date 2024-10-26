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
  }, []);

  const handleAdminNavigate = () => {
    navigate("/admin");
  };

  const toggleAddressForm = () => setShowAddressForm(!showAddressForm);

  const handleDeleteAddress = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:3306/perfil/endereco_cliente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData((prevData) => ({
        ...prevData,
        endereco: null,
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
          <h1>Detalhes do Perfil:</h1>
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
                <div className="singleAddress">
                  {userData.endereco.map((endereco, index) => (
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
                      <p>
                        <button
                          onClick={() =>
                            handleDeleteAddress(endereco.cliente_id)
                          }
                        >
                          Excluir Endereço
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p>
                    <strong>
                      Nenhum endereço disponível. Adicione um novo abaixo:
                    </strong>
                  </p>
                  <button
                    className="ButtonAddAddress"
                    onClick={toggleAddressForm}
                  >
                    Adicionar Endereço
                  </button>
                  {showAddressForm && <Endereco />}
                </>
              )}
            </div>
          </div>
          <Pedidos></Pedidos>
        </div>
      </div>
    </div>
  );
};

export default Main;
