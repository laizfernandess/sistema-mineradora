import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  const carregarEquipamentos = async () => {
    try {
      const response = await equipamentoService.listar();
      setEquipamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipamentos', error);
    }
  };

  const cadastrarEquipamento = async () => {
    if (!nome.trim() || !setor.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      await equipamentoService.cadastrar({ nome: nome.trim(), setor: setor.trim() });
      setNome('');
      setSetor('');
      carregarEquipamentos();
    } catch (error) {
      console.error('Erro ao cadastrar', error);
      setErro('Não foi possível cadastrar o equipamento.');
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Equipamentos</h1>
        <p>Cadastre e acompanhe todos os equipamentos utilizados na mineradora.</p>
      </div>

      <div className="formulario-cadastro">
        <h3>Novo equipamento</h3>
        <div className="form-row">
          <input
            className={`field-input ${erro && !nome.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Nome do equipamento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className={`field-input ${erro && !setor.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Setor (Ex: Extração)"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          />
        </div>
        {erro && <p className="form-error">{erro}</p>}
        <div className="form-actions">
          <button type="button" onClick={cadastrarEquipamento}>Cadastrar</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Equipamentos cadastrados</h3>
        {equipamentos.length === 0 ? (
          <p className="empty-state">Nenhum equipamento encontrado.</p>
        ) : (
          <ul>
            {equipamentos.map((eq) => (
              <li key={eq.id}><strong>{eq.nome}</strong> - Setor: {eq.setor}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
