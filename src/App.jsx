import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ItensPage from "./pages/ItensPage"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias/:id" element={<CategoryPage />} />
        <Route path="/itens" element={<ItensPage />} />
      </Routes>
    </Router>
  );
}

export default App;
