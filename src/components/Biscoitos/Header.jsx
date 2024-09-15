import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="BiscoitoHeader">
      <div className="Modal">
        <Link to="/retirada">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className="Text">
        <h1>RETIRE SEU DOCE!</h1>
      </div>
      <div className="Cart">
        <Link to="/">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </header>
  );
}