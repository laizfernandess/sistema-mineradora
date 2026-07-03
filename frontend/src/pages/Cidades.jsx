import React from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [erro, setErro] = React.useState('');
  const [editandoId, setEditandoId] = React.useState(null);

  React.useEffect(() => {
    carregarCidades();
  }, []);

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
    setEstado('');
    setErro('');
    setEditandoId(null);
  };

  const handleEditar = (cidade) => {
    setEditandoId(cidade.id);
    setNome(cidade.nome);
    setEstado(cidade.estado);
    setErro('');
  };

  const salvarCidade = async () => {
    if (!nome.trim() || !estado.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');

    try {
      if (editandoId) {
        await cidadeService.atualizar(editandoId, { nome: nome.trim(), estado: estado.trim() });
      } else {
        await cidadeService.cadastrar({ nome: nome.trim(), estado: estado.trim() });
      }

      resetarFormulario();
      carregarCidades();
    } catch (error) {
      console.error('Erro ao salvar cidade', error);
      setErro(editandoId ? 'Não foi possível atualizar a cidade.' : 'Não foi possível cadastrar a cidade.');
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Cidades</h1>
        <p>Registre as cidades atendidas pela mineradora e organize por estado.</p>
      </div>

      <div className="formulario-cadastro">
        <h3>Nova cidade</h3>
        <div className="form-row">
          <input
            className={`field-input ${erro && !nome.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Nome da cidade"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className={`field-input ${erro && !estado.trim() ? 'input-error' : ''}`}
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        {erro && <p className="form-error">{erro}</p>}
        <div className="form-actions">
          {editandoId && (
            <button type="button" className="secondary-btn" onClick={resetarFormulario}>Cancelar</button>
          )}
          <button type="button" onClick={salvarCidade}>{editandoId ? 'Salvar edição' : 'Cadastrar'}</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Cidades cadastradas</h3>
        {cidades.length === 0 ? (
          <p className="empty-state">Nenhuma cidade cadastrada.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Estado</th>
                <th className="table-action-header"></th>
              </tr>
            </thead>
            <tbody>
              {cidades.map((cidade) => (
                <tr key={cidade.id}>
                  <td>{cidade.nome}</td>
                  <td>{cidade.estado}</td>
                  <td>
                    <span className="edit-icon" onClick={() => handleEditar(cidade)} title="Editar">✏️</span>
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
