import React, { useState } from 'react';
import Pedidos from './Pedidos';
import Produtos from './Produtos';
import Clientes from './Clientes';
import Dashboard from "./Dashboard";
import Avaliacoes from "./Avaliacoes";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2 className="admin-title">Painel Admin</h2>
        <ul className="admin-nav">
          <li 
            className={`admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={`admin-nav-item ${activeSection === 'clientes' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('clientes')}
          >
            Clientes
          </li>
          <li 
            className={`admin-nav-item ${activeSection === 'pedidos' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('pedidos')}
          >
            Pedidos
          </li>
          <li 
            className={`admin-nav-item ${activeSection === 'produtos' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('produtos')}
          >
            Produtos
          </li>
          <li 
            className={`admin-nav-item ${activeSection === 'avaliacoes' ? 'active' : ''}`} 
            onClick={() => handleSectionClick('avaliacoes')}
          >
            Avaliações
          </li>
        </ul>
      </nav>

      <main className="admin-content">
        {activeSection === 'dashboard' && (
          <Dashboard></Dashboard>
        )}
        {activeSection === 'clientes' && (
          <Clientes></Clientes>
        )}
        {activeSection === 'pedidos' && (
          <Pedidos></Pedidos>
        )}
        {activeSection === 'produtos' && (
          <Produtos></Produtos>
        )}
         {activeSection === 'avaliacoes' && (
          <Avaliacoes></Avaliacoes>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
