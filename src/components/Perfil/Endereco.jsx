import React, { useState } from 'react';
import axios from 'axios';

const Endereco = () => {
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [erroMensagem, setErroMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Dados do endereço:", {
      rua,
      numero,
      bairro,
      cep,
    });
  
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(
        'http://localhost:3306/perfil/endereco_cliente', // Verifique a porta aqui
        {
          rua_endereco: rua,
          numero_endereco: numero,
          bairro_endereco: bairro,
          cep_endereco: cep,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload(); 
      if (response.status === 200) {
        setMensagemSucesso('Endereço adicionado com sucesso!');
        setTimeout(() => {
          
        }, 1000); 
      }
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error.response ? error.response.data : error);
      setErroMensagem('Falha ao adicionar o endereço, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Adicionar Endereço</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rua:</label>
          <input
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Número:</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </div>
        <button className="ButtonAddAddress" type="submit">Adicionar Endereço</button>
      </form>
      {mensagemSucesso && <p style={{ color: 'green' }}>{mensagemSucesso}</p>}
      {erroMensagem && <p style={{ color: 'red' }}>{erroMensagem}</p>}
    </div>
  );
};

export default Endereco;