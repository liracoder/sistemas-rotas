// Instância única do Prisma Client, compartilhada por todos os módulos.
// Evita abrir uma conexão nova a cada arquivo que precisa falar com o banco.
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
