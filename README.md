# Sistema de Otimização de Rotas

Painel web para selecionar clientes do dia e gerar automaticamente a melhor ordem de entrega, partindo da empresa.

## O que o sistema faz

- Cadastro de clientes com endereço geocodificado
- Seleção de clientes por busca (nome ou referência, ex: nome de transportadora)
- Cálculo de rota otimizada via API de mapas
- Ajuste iterativo (adicionar/remover cliente e recalcular) antes de confirmar
- Histórico de rotas salvas por viagem (pode haver mais de uma por dia)

## Stack

Node.js + Express/Fastify · PostgreSQL + Prisma · React

Ver justificativa completa em [`docs/adr/0003-stack-tecnica.md`](docs/adr/0003-stack-tecnica.md).

## Documentação

- [Arquitetura geral, modelo de domínio e diagramas](docs/arquitetura.md)
- [Decisões arquiteturais (ADRs)](docs/adr/)

## Como rodar localmente

```bash
# instalar dependências
npm install

# configurar variáveis de ambiente (.env)
cp .env.example .env
# preencher: DATABASE_URL, GOOGLE_MAPS_API_KEY

# rodar migrations
npx prisma migrate dev

# subir o servidor
npm run dev
```
