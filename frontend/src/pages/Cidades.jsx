import React from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [erro, setErro] = React.useState('');

  React.useEffect(() => {
    cidadeService.listar().then((response) => {
      setCidades(response.data);
    });
  }, []);

  const cadastrarCidade = () => {
    if (!nome.trim() || !estado.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setErro('');
    cidadeService.cadastrar({ nome: nome.trim(), estado: estado.trim() }).then((response) => {
      setCidades([...cidades, response.data]);
      setNome('');
      setEstado('');
    });
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
          <button type="button" onClick={cadastrarCidade}>Cadastrar</button>
        </div>
      </div>

      <div className="card-lista">
        <h3>Cidades cadastradas</h3>
        {cidades.length === 0 ? (
          <p className="empty-state">Nenhuma cidade cadastrada.</p>
        ) : (
          <ul>
            {cidades.map((cidade) => (
              <li key={cidade.id}><strong>{cidade.nome}</strong> - Estado: {cidade.estado}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
