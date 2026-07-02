import React from "react";
import './Menu.css';

export default function Menu({ pagina, setPagina }) {
  const links = [
    { value: 'inicio', label: 'Início' },
    { value: 'equipamentos', label: 'Equipamentos' },
    { value: 'cidades', label: 'Cidades' },
    { value: 'funcionarios', label: 'Funcionários' },
    { value: 'servicos', label: 'Serviços' }
  ];

  return (
    <nav className="top-nav">
      <div className="brand">
        <div className="brand-badge">⛏</div>
        <div>
          <div className="brand-title">Mineradora Ceará</div>
          <div className="brand-subtitle">Operações integradas</div>
        </div>
      </div>

      <div className="nav-links">
        {links.map((link) => (
          <button
            key={link.value}
            className={`nav-link ${pagina === link.value ? 'active' : ''}`}
            onClick={() => setPagina(link.value)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
