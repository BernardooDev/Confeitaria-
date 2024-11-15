import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="TortasHeader">
      <div className="Modal">
        <Link to="/produtos">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className="Text">
        <h1>Cones Trufados</h1>
      </div>
      <div className="Cart">
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </header>
  );
}