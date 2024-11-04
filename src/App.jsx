import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RetiradaPage from "./pages/RetiradaPage";
import EncomendaPage from "./pages/EncomendaPage";
import Bolos from "./components/Bolos/Bolos";
import "./index.css";
import Trufados from "./components/Trufados/Trufados";
import CupcakesPage from "./pages/CupcakesPage";
import BiscoitosPage from "./pages/BiscoitosPage";
import { CartProvider } from "./State/CartContext";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import Perfilpage from "./pages/PerfilPage";
import LocalPage from "./pages/LocalPage";
import AdminPage from "./pages/AdminPage";
import NotFound  from "./components/NotFound";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<RetiradaPage />} />
          <Route path="bolos" element={<Bolos />} />
          <Route path="trufados" element={<Trufados />} />
          <Route path="cupcakes" element={<CupcakesPage />} />
          <Route path="biscoitos" element={<BiscoitosPage />} />
          <Route path="/encomenda" element={<EncomendaPage />} />
          <Route path="/perfil" element={<Perfilpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/localizacao" element={<LocalPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
