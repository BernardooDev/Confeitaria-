import React from "react";
import "../../styles/Localização/index.css";
import Maps from "../../assets/Maps.png";

export default function Main() {
  return (
    <div className="MainContent">
      <div className="localizacao-container">
        <h2 className="localizacao-titulo">Nossa Localização</h2>

        <div className="localizacao-info">
          <p className="localizacao-endereco">
            R. Intendência, 90 - Brás, São Paulo - SP
          </p>
          <p className="localizacao-telefone">
            <strong>Telefone:</strong> (11) 96605-7022
          </p>
        </div>

        <div className="localizacao-mapa">
          <img
            src={Maps}
            alt="Mapa da localização"
            className="imagem-mapa"
          />
        </div>
      </div>
    </div>
  );
}
