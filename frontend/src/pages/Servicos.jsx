import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços', error);
    }
  };

  const resetarFormulario = () => {
    setNome('');
    setDescricao('');
    setErro('');
    setEditandoId(null);
  };

  const handleEditar = (servico) => {
    setEditandoId(servico.id);
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setErro('');
  };

  const salvarServico = async () => {
    if (!nome.trim() || !descricao.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      if (editandoId) {
        await servicoService.atualizar(editandoId, { nome: nome.trim(), descricao: descricao.trim() });
      } else {
        await servicoService.cadastrar({ nome: nome.trim(), descricao: descricao.trim() });
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
                <th className="table-action-header"></th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((serv) => (
                <tr key={serv.id}>
                  <td>{serv.nome}</td>
                  <td>{serv.descricao}</td>
                  <td>
                    <span className="edit-icon" onClick={() => handleEditar(serv)} title="Editar">✏️</span>
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
