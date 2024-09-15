import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RetiradaPage from "./pages/RetiradaPage";
import EncomendaPage from "./pages/EncomendaPage";
import Bolos from "./components/Bolos/Bolos";
import "./index.css";
import Tortas from "./components/Tortas/Tortas";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/retirada" element={<RetiradaPage />} />
          <Route path="bolo-de-pote" element={<Bolos />} />
          <Route path="tortas" element={<Tortas />} />
        <Route path="/encomenda" element={<EncomendaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
