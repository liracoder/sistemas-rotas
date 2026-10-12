// Regras de negócio do módulo Clientes.
// É esta camada que o resto do sistema (incluindo Planejamento de Rotas) usa —
// nunca o repositório diretamente.
import * as repositorio from "./clientes.repository.js";
import { geocodificar } from "./geocodificacao.js";

export async function criarCliente({ nome, endereco, referencia, contato }) {
  if (!nome || !endereco) {
    throw new Error("Nome e endereço são obrigatórios.");
  }

  const { latitude, longitude } = await geocodificar(endereco);

  return repositorio.salvar({
    nome,
    endereco,
    referencia: referencia || null,
    contato: contato || null,
    latitude,
    longitude,
  });
}

export async function listarClientes(filtro) {
  return repositorio.listar(filtro);
}

export async function buscarClientePorId(id) {
  const cliente = await repositorio.buscarPorId(id);
  if (!cliente) throw new Error("Cliente não encontrado.");
  return cliente;
}

export async function editarCliente(id, dados) {
  await buscarClientePorId(id); // garante que existe antes de tentar editar

  // Se o endereço mudou, geocodifica de novo; senão, mantém como está
  let coordenadas = {};
  if (dados.endereco) {
    coordenadas = await geocodificar(dados.endereco);
  }

  return repositorio.atualizar(id, { ...dados, ...coordenadas });
}

export async function removerCliente(id) {
  await buscarClientePorId(id);
  return repositorio.remover(id);
}
