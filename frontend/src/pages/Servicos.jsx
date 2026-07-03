import React, { useState, useEffect } from 'react';
import { servicoService, funcionarioService, cidadeService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarServicos();
    carregarFuncionarios();
    carregarCidades();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços', error);
    }
  };

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
    setDescricao('');
    setFuncionarioId('');
    setCidadeId('');
    setErro('');
    setEditandoId(null);
  };

  const handleEditar = (servico) => {
    setEditandoId(servico.id);
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setFuncionarioId(servico.funcionarioId || '');
    setCidadeId(servico.cidadeId || '');
    setErro('');
  };

  const salvarServico = async () => {
    if (!nome.trim() || !descricao.trim() || !funcionarioId || !cidadeId) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      const dadosServico = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        funcionarioId,
        cidadeId,
      };

      if (editandoId) {
        await servicoService.atualizar(editandoId, dadosServico);
      } else {
        await servicoService.cadastrar(dadosServico);
      }

      resetarFormulario();
      carregarServicos();
    } catch (error) {
      console.error('Erro ao salvar serviço', error);
      setErro(editandoId ? 'Não foi possível atualizar o serviço.' : 'Não foi possível cadastrar o serviço.');
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Serviços</h1>
        <p>Cadastre e acompanhe os serviços prestados pela equipe da mineradora.</p>
      </div>

      <div className="formulario-cadastro">
        <h3>Novo serviço</h3>
        <div className="form-row">
          <input
            className={`field-input ${erro && !nome.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className={`field-input ${erro && !descricao.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <select
            className={`field-input ${erro && !funcionarioId ? 'input-error' : ''}`}
            value={funcionarioId}
            onChange={(e) => setFuncionarioId(e.target.value)}
          >
            <option value="">Selecione o funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
          </select>
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
          <button type="button" onClick={salvarServico}>{editandoId ? 'Salvar edição' : 'Cadastrar'}</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Serviços cadastrados</h3>
        {servicos.length === 0 ? (
          <p className="empty-state">Nenhum serviço cadastrado.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Funcionário</th>
                <th>Cidade</th>
                <th className="table-action-header"></th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((serv) => {
                const funcionario = funcionarios.find((item) => item.id === Number(serv.funcionarioId));
                const cidade = cidades.find((item) => item.id === Number(serv.cidadeId));
                return (
                  <tr key={serv.id}>
                    <td>{serv.nome}</td>
                    <td>{serv.descricao}</td>
                    <td>{funcionario ? funcionario.nome : '-'}</td>
                    <td>{cidade ? cidade.nome : '-'}</td>
                    <td>
                      <span className="edit-icon" onClick={() => handleEditar(serv)} title="Editar">✏️</span>
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
