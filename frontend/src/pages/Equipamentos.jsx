import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null);

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

  const resetarFormulario = () => {
    setNome('');
    setSetor('');
    setErro('');
    setEditandoId(null);
  };

  const handleEditar = (equipamento) => {
    setEditandoId(equipamento.id);
    setNome(equipamento.nome);
    setSetor(equipamento.setor);
    setErro('');
  };

  const salvarEquipamento = async () => {
    if (!nome.trim() || !setor.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      if (editandoId) {
        await equipamentoService.atualizar(editandoId, { nome: nome.trim(), setor: setor.trim() });
      } else {
        await equipamentoService.cadastrar({ nome: nome.trim(), setor: setor.trim() });
      }

      resetarFormulario();
      carregarEquipamentos();
    } catch (error) {
      console.error('Erro ao salvar equipamento', error);
      setErro(editandoId ? 'Não foi possível atualizar o equipamento.' : 'Não foi possível cadastrar o equipamento.');
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
          {editandoId && (
            <button type="button" className="secondary-btn" onClick={resetarFormulario}>Cancelar</button>
          )}
          <button type="button" onClick={salvarEquipamento}>{editandoId ? 'Salvar edição' : 'Cadastrar'}</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Equipamentos cadastrados</h3>
        {equipamentos.length === 0 ? (
          <p className="empty-state">Nenhum equipamento encontrado.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Setor</th>
                <th className="table-action-header"></th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((eq) => (
                <tr key={eq.id}>
                  <td>{eq.nome}</td>
                  <td>{eq.setor}</td>
                  <td>
                    <span className="edit-icon" onClick={() => handleEditar(eq)} title="Editar">✏️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
