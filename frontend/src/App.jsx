import React, { useState } from 'react';
import './App.css';
import Inicio from './pages/Inicio';
import Menu from './components/Menu';
import Equipamentos from './pages/Equipamentos';
import Cidades from './pages/Cidades';
import Funcionarios from './pages/Funcionarios';
import Servicos from './pages/Servicos';

export default function App() {
  const [pagina, setPagina] = useState('inicio');

  return (
    <div className="app-shell">
      <Menu pagina={pagina} setPagina={setPagina} />

      <main className="page-content">
        {pagina === 'inicio' && <Inicio setPagina={setPagina} />}
        {pagina === 'equipamentos' && <Equipamentos />}
        {pagina === 'cidades' && <Cidades />}
        {pagina === 'funcionarios' && <Funcionarios />}
        {pagina === 'servicos' && <Servicos />}
      </main>
    </div>
  );
}
