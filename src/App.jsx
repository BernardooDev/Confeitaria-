import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RetiradaPage from "./pages/RetiradaPage";
import EncomendaPage from "./pages/EncomendaPage";
import Bolos from "./components/Bolos/Bolos";
import "./index.css";
import Tortas from "./components/Tortas/Tortas";
import CupcakesPage from "./pages/CupcakesPage";
import BiscoitosPage from "./pages/BiscoitosPage";
import { CartProvider } from "./State/CartContext";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/retirada" element={<RetiradaPage />} />
          <Route path="bolo-de-pote" element={<Bolos />} />
          <Route path="tortas" element={<Tortas />} />
          <Route path="cupcakes" element={<CupcakesPage /> } /> 
          <Route path="biscoitos" element={<BiscoitosPage />} />
        <Route path="/encomenda" element={<EncomendaPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
    </CartProvider>

  );
};

export default App;
