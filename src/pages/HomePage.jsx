import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/Homepage.css";

const HomePage = () => {
  return (
    <div>
      <div className="HeaderTop">
        <header className="Header">
          <div className="Logo">
            <img src={Logo} alt="Logo da confeitaria" />
          </div>
          <div className="TextCenter">
            <h1 className="Title">Senhorita Confeitaria</h1>
            <p className="Text">Momentos especiais, merecem doces especiais!</p>
          </div>
        </header>
      </div>

      <main>
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
            <span>PROMOÇÕES!</span>
          </h1>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
