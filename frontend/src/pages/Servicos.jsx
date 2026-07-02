import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

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

  const cadastrarServico = async () => {
    if (!nome.trim() || !descricao.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      await servicoService.cadastrar({ nome: nome.trim(), descricao: descricao.trim() });
      setNome('');
      setDescricao('');
      carregarServicos();
    } catch (error) {
      console.error('Erro ao cadastrar serviço', error);
      setErro('Não foi possível cadastrar o serviço.');
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
          <button type="button" onClick={cadastrarServico}>Cadastrar</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Serviços cadastrados</h3>
        {servicos.length === 0 ? (
          <p className="empty-state">Nenhum serviço cadastrado.</p>
        ) : (
          <ul>
            {servicos.map((serv) => (
              <li key={serv.id}><strong>{serv.nome}</strong> - Descrição: {serv.descricao}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
