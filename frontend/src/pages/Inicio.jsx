import React from 'react';

export default function Inicio({ setPagina }) {
  return (
    <div className="container">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Painel operacional</p>
          <h1>Bem-vindo ao sistema da Mineradora Ceará</h1>
          <p>Escolha uma área para gerenciar seus registros e manter a operação organizada.</p>
        </div>
      </div>

      <div className="stats-grid">
        <button type="button" className="stat-card nav-card" onClick={() => setPagina('equipamentos')}>
          <strong>Equipamentos</strong>
          <span>Cadastre e acompanhe os ativos da operação.</span>
        </button>
        <button type="button" className="stat-card nav-card" onClick={() => setPagina('funcionarios')}>
          <strong>Funcionários</strong>
          <span>Organize os colaboradores por função e setor.</span>
        </button>
        <button type="button" className="stat-card nav-card" onClick={() => setPagina('servicos')}>
          <strong>Serviços</strong>
          <span>Gerencie os serviços realizados pela equipe.</span>
        </button>
        <button type="button" className="stat-card nav-card" onClick={() => setPagina('cidades')}>
          <strong>Cidades</strong>
          <span>Registre e gerencie as cidades da mineradora.</span>
        </button>
      </div>
    </div>
  );
}
