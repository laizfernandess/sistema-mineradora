import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários', error);
    }
  };

  const resetarFormulario = () => {
    setNome('');
    setCargo('');
    setErro('');
    setEditandoId(null);
  };

  const handleEditar = (funcionario) => {
    setEditandoId(funcionario.id);
    setNome(funcionario.nome);
    setCargo(funcionario.cargo);
    setErro('');
  };

  const salvarFuncionario = async () => {
    if (!nome.trim() || !cargo.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      if (editandoId) {
        await funcionarioService.atualizar(editandoId, { nome: nome.trim(), cargo: cargo.trim() });
      } else {
        await funcionarioService.cadastrar({ nome: nome.trim(), cargo: cargo.trim() });
      }

      resetarFormulario();
      carregarFuncionarios();
    } catch (error) {
      console.error('Erro ao salvar funcionário', error);
      setErro(editandoId ? 'Não foi possível atualizar o funcionário.' : 'Não foi possível cadastrar o funcionário.');
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Funcionários</h1>
        <p>Registre e organize os colaboradores da mineradora por cargo.</p>
      </div>

      <div className="formulario-cadastro">
        <h3>Novo funcionário</h3>
        <div className="form-row">
          <input
            className={`field-input ${erro && !nome.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Nome do funcionário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className={`field-input ${erro && !cargo.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>
        {erro && <p className="form-error">{erro}</p>}
        <div className="form-actions">
          {editandoId && (
            <button type="button" className="secondary-btn" onClick={resetarFormulario}>Cancelar</button>
          )}
          <button type="button" onClick={salvarFuncionario}>{editandoId ? 'Salvar edição' : 'Cadastrar'}</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Funcionários cadastrados</h3>
        {funcionarios.length === 0 ? (
          <p className="empty-state">Nenhum funcionário cadastrado.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th className="table-action-header"></th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((func) => (
                <tr key={func.id}>
                  <td>{func.nome}</td>
                  <td>{func.cargo}</td>
                  <td>
                    <span className="edit-icon" onClick={() => handleEditar(func)} title="Editar">✏️</span>
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
