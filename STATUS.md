# Status — Sistema de Otimização de Rotas

> Atualize este arquivo sempre que avançar uma etapa. Quando voltar ao projeto após um tempo, cole ou anexe este arquivo numa conversa com Claude e diga "retomar projeto de rotas".

## Contexto do projeto

Empresa de pequeno porte (onde você trabalha em outro setor), sem TI própria, um motorista/veículo só, que hoje monta a rota de entregas manualmente. Você (estudante de TI) está construindo um painel web para automatizar a seleção de clientes do dia e gerar a rota otimizada.

## Etapas do raciocínio de arquitetura

- [x] **1. Contexto e requisitos**
- [x] **2. Modelagem de domínio**
- [x] **3. Decisões arquiteturais (ADRs)**
- [x] **4. Design de componentes / baixo acoplamento**
- [x] **5. Documentação viva**
- [ ] **6. Esqueleto de código** — EM ANDAMENTO (ver "Onde paramos")

## Decisões já tomadas (resumo)

**Stack:** Node.js + Express + PostgreSQL (via Prisma) + React. Hospedagem planejada: Render ou Railway.

**Módulos:**
- **Clientes** — CRUD puro, geocodifica endereço ao cadastrar (geocodificação ainda é stub)
- **Otimização** — isola o fornecedor de rota (Google Directions API, `optimizeWaypoints: true`) — contrato definido, implementação pendente
- **Planejamento de Rotas** — orquestra os outros dois — ainda não implementado

**ADRs:** 001 (edição via recálculo), 002 (isolamento do provedor de otimização), 003 (stack técnica) — todos em `docs/adr/` no GitHub.

**Modelo de dados:** Cliente, Rota, ParadaDaRota — já migrados no banco.

**Repositório:** GitHub, com docs/ completo. Código (`src/`, `package.json`, `.gitignore`, `.env.example`, `prisma/`) ainda só local, não commitado.

## Onde paramos

- ✅ Banco PostgreSQL funcionando (`sistema_rotas`)
- ✅ Servidor Express rodando localmente
- ✅ **Módulo Clientes — CRUD completo e testado via Postman** (criar/listar/editar/remover), confirmado também direto na tabela via pgAdmin
- ⏳ Geocodificação ainda é stub (coordenadas zeradas)
- ⏳ Módulo Otimização: só o contrato da função `calcularMelhorOrdem()` existe, lança erro "ainda não implementada"
- ⏳ Módulo Planejamento de Rotas: não iniciado

**Próximo passo concreto, nessa ordem:**
1. Criar uma chave de API do Google Maps (Directions + Geocoding)
2. Implementar `calcularMelhorOrdem()` de verdade no módulo Otimização
3. Trocar o stub de geocodificação pela chamada real
4. Implementar o módulo Planejamento de Rotas (orquestrador)
5. Só depois: frontend de verdade (o preview HTML feito antes foi só pra visualizar o fluxo de UI, não é o código real)

**Ainda não commitado no GitHub:** `package.json`, `.gitignore`, `.env.example`, `prisma/`, `src/` inteiro — vale commitar agora que o módulo Clientes está funcionando, pra já subir um pedaço funcional em vez de esperar o projeto todo.

## Entregáveis já produzidos

- `README.md`, `docs/arquitetura.md`, `docs/adr/0001-0003` — no GitHub
- `package.json`, `.gitignore`, `.env.example`, `prisma/schema.prisma` — local
- `src/` completo: servidor Express + módulo Clientes (CRUD funcional) + contratos dos módulos Otimização e Planejamento de Rotas — local
- Preview visual do painel (artifact HTML interativo — só mockup de fluxo, não é o código real)
