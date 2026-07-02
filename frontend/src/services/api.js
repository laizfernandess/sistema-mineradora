const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let equipamentos = [
  { id: 1, nome: 'Equipamento A', setor: 'Setor 1' },
  { id: 2, nome: 'Equipamento B', setor: 'Setor 2' },
  { id: 3, nome: 'Equipamento C', setor: 'Setor 3' },
];

export const equipamentoService = {
  listar: async () => {
    await delay(500); //
    return {
      data: [...equipamentos],
    };
  },

  cadastrar: async (equipamento) => {
    await delay(500);
    const novoEquipamento = {
      id: equipamentos.length + 1,
      ...equipamento,
    };
    equipamentos.push(novoEquipamento);
    return {
      data: novoEquipamento,
    };

  },
};

let cidades = [
  { id: 1, nome: 'Cidade A', estado: 'Estado 1' },
  { id: 2, nome: 'Cidade B', estado: 'Estado 2' },
  { id: 3, nome: 'Cidade C', estado: 'Estado 3' },
];

export const cidadeService = {
  listar: async () => {
    await delay(500);
    return {
      data: [...cidades],
    };
  },

  cadastrar: async (cidade) => {
    await delay(500);
    const novaCidade = {
      id: cidades.length + 1,
      ...cidade,
    };
    cidades.push(novaCidade);
    return {
      data: novaCidade,
    };
  },
};

let funcionarios = [
  { id: 1, nome: 'Funcionário A', cargo: 'Cargo 1' },
  { id: 2, nome: 'Funcionário B', cargo: 'Cargo 2' },
  { id: 3, nome: 'Funcionário C', cargo: 'Cargo 3' },
];

export const funcionarioService = {
  listar: async () => {
    await delay(500);
    return {
      data: [...funcionarios],
    };
  },

  cadastrar: async (funcionario) => {
    await delay(500);
    const novoFuncionario = {
      id: funcionarios.length + 1,
      ...funcionario,
    };
    funcionarios.push(novoFuncionario);
    return {
      data: novoFuncionario,
    };
  },
}

let servicos = [
  { id: 1, nome: 'Serviço A', setor: 'Setor 1' },
  { id: 2, nome: 'Serviço B', setor: 'Setor 2' },
  { id: 3, nome: 'Serviço C', setor: 'Setor 3' },
];

export const servicoService = {
  listar: async () => {
    await delay(500);
    return {
      data: [...servicos],
    };
  },

  cadastrar: async (servico) => {
    await delay(500);
    const novoServico = {
      id: servicos.length + 1,
      ...servico,
    };
    servicos.push(novoServico);
    return {
      data: novoServico,
    };
  },
};
