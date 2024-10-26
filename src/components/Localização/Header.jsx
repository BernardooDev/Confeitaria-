import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="LocalHeader">
      <div className="Modal">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
      <div className="Text">
        <h1>Localização</h1>
        <FontAwesomeIcon icon={faLocationDot} />
      </div>
      <div className="Cart">
        <Link to="/perfil">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </header>
  );
}
