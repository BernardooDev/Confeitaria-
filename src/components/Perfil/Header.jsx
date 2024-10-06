import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="PerfilHeader">
      <div className="Modal">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
      <div className="Text">
        <h1>Cliente</h1>
      </div>
      <div className="Cart">
        <Link to="/checkout">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="LogoutButton"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </Link>
      </div>
    </header>
  );
}
