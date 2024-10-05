import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div>
      <header className="Header">
        <div className="HeaderLogo">
          <img src={Logo} alt="Logo da confeitaria" />
        </div>
        <nav className="HeaderNav">
          <Link to="/retirada">Retirada</Link>
          <Link to="/encomenda">Encomenda</Link>
        </nav>
        <div className="HeaderLogin">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </div>
      </header>

      <main className="MainContent">
        <div className="Orders">
          <h1>
            <Link to="/retirada">
              <span>RETIRE SEU DOCE!</span>
            </Link>
          </h1>
        </div>
        <div className="Orders">
          <h1>
            <Link to="/encomenda">
              <span>FAÇA SUA ENCOMENDA!</span>
            </Link>
          </h1>
        </div>
        <div className="Orders">
          <h1>
          <Link to="/encomenda">
              <span>PROMOÇÕES!</span>
            </Link>
          </h1>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
