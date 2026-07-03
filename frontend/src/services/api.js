const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const salvar = (chave, valor) => {
  localStorage.setItem(chave, JSON.stringify(valor));
};

const carregar = (chave, valorInicial) => {
  const valor = localStorage.getItem(chave);
  if (valor) {
    return JSON.parse(valor);
  }
  return valorInicial;
};

let equipamentos = carregar('equipamentos', []);

export const equipamentoService = {
  listar: async () => {
    await delay(500);
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
    salvar("equipamentos", equipamentos);
    return {
      data: novoEquipamento,
    };
  },

  atualizar: async (id, equipamento) => {
    await delay(500);
    const index = equipamentos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Equipamento não encontrado');
    }

    equipamentos[index] = {
      ...equipamentos[index],
      ...equipamento,
    };
    salvar("equipamentos", equipamentos);
    return {
      data: equipamentos[index],
    };
  },
};

let cidades = carregar('cidades', []);

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
    salvar("cidades", cidades);
    return {
      data: novaCidade,
    };
  },

  atualizar: async (id, cidade) => {
    await delay(500);
    const index = cidades.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Cidade não encontrada');
    }

    cidades[index] = {
      ...cidades[index],
      ...cidade,
    };
    salvar("cidades", cidades);
    return {
      data: cidades[index],
    };
  },
};

let funcionarios = carregar('funcionarios', []);

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
    salvar("funcionarios", funcionarios);
    return {
      data: novoFuncionario,
    };
  },

  atualizar: async (id, funcionario) => {
    await delay(500);
    const index = funcionarios.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Funcionário não encontrado');
    }

    funcionarios[index] = {
      ...funcionarios[index],
      ...funcionario,
    };
    salvar("funcionarios", funcionarios);
    return {
      data: funcionarios[index],
    };
  },
};

let servicos = carregar('servicos', []);

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
    salvar("servicos", servicos);
    return {
      data: novoServico,
    };
  },

  atualizar: async (id, servico) => {
    await delay(500);
    const index = servicos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Serviço não encontrado');
    }

    servicos[index] = {
      ...servicos[index],
      ...servico,
    };
    salvar("servicos", servicos);
    return {
      data: servicos[index],
    };
  },
};