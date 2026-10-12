// Camada de acesso a dados do módulo Clientes.
// Único arquivo do sistema que fala diretamente com a tabela "clientes".
import { prisma } from "../../lib/prisma.js";

export async function salvar(dadosCliente) {
  return prisma.cliente.create({ data: dadosCliente });
}

export async function listar({ busca } = {}) {
  if (!busca) {
    return prisma.cliente.findMany({ orderBy: { nome: "asc" } });
  }

  // Busca por nome OU referência (ex: nome de transportadora) — RF07
  return prisma.cliente.findMany({
    where: {
      OR: [
        { nome: { contains: busca, mode: "insensitive" } },
        { referencia: { contains: busca, mode: "insensitive" } },
      ],
    },
    orderBy: { nome: "asc" },
  });
}

export async function buscarPorId(id) {
  return prisma.cliente.findUnique({ where: { id } });
}

export async function buscarPorIds(ids) {
  return prisma.cliente.findMany({ where: { id: { in: ids } } });
}

export async function atualizar(id, dadosCliente) {
  return prisma.cliente.update({ where: { id }, data: dadosCliente });
}

export async function remover(id) {
  return prisma.cliente.delete({ where: { id } });
}
