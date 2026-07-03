import React, { useState, useEffect } from 'react';
import { funcionarioService, cidadeService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
    carregarCidades();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários', error);
    }
  };

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      setCidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar cidades', error);
    }
  };

  const resetarFormulario = () => {
    setNome('');
    setCargo('');
    setCidadeId('');
    setErro('');
    setEditandoId(null);
  };

  const handleEditar = (funcionario) => {
    setEditandoId(funcionario.id);
    setNome(funcionario.nome);
    setCargo(funcionario.cargo);
    setCidadeId(funcionario.cidadeId || '');
    setErro('');
  };

  const salvarFuncionario = async () => {
    if (!nome.trim() || !cargo.trim() || !cidadeId) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      const dadosFuncionario = {
        nome: nome.trim(),
        cargo: cargo.trim(),
        cidadeId,
      };

      if (editandoId) {
        await funcionarioService.atualizar(editandoId, dadosFuncionario);
      } else {
        await funcionarioService.cadastrar(dadosFuncionario);
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
          <select
            className={`field-input ${erro && !cidadeId ? 'input-error' : ''}`}
            value={cidadeId}
            onChange={(e) => setCidadeId(e.target.value)}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
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
                <th>Cidade</th>
                <th className="table-action-header"></th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((func) => {
                const cidade = cidades.find((item) => item.id === Number(func.cidadeId));
                return (
                  <tr key={func.id}>
                    <td>{func.nome}</td>
                    <td>{func.cargo}</td>
                    <td>{cidade ? cidade.nome : '-'}</td>
                    <td>
                      <span className="edit-icon" onClick={() => handleEditar(func)} title="Editar">✏️</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
