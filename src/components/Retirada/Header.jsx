import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShoppingCart,faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="RetiradaHeader">
      <div className="Modal">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
      <div className="Text">
        <h1>Produtos</h1>
        <FontAwesomeIcon icon={faBagShopping} />
      </div>
      <div className="Cart">
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </header>
  );
}
