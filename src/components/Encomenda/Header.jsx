import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="EncomendaHeader">
      <div className="Modal">
        <Link to="/retirada">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
      <div className="Text">
        <h1>FAÇA SUA ENCOMENDA!</h1>
      </div>
      <div className="Cart">
        <Link to="/">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </header>
  );
}
