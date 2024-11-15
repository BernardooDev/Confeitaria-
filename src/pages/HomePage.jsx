import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Carrossel from "../components/Carrossel/Carrossel";

const HomePage = () => {
  return (
    <div>
      <header className="Header">
        <div className="HeaderLogo">
          <img src={Logo} alt="Logo da confeitaria" />
        </div>
        <nav className="HeaderNav">
          <Link to="/produtos">Produtos</Link>
          <Link to="/encomenda">Encomenda</Link>
          <Link to="/localizacao"> Localização</Link>
        </nav>
        <div className="HeaderLogin">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </div>
      </header>

      <main className="MainContent">
        <div className="OrdersList">
          <div className="Orders">
            <h1>
              <Link to="/produtos">
                <span>Retire seu Doce!</span>
              </Link>
            </h1>
          </div>
          <div className="Orders">
            <h1>
              <Link to="/avaliacoes">
                <span>Avaliações</span>
              </Link>
            </h1>
          </div>
          <div className="Orders">
            <h1>
              <Link to="/promocoes">
                <span>Promoções!</span>
              </Link>
            </h1>
          </div>
        </div>
        <h1>Confira nossos produtos!</h1>
        <Carrossel></Carrossel>
      </main>
    </div>
  );
};

export default HomePage;
