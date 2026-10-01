# ADR-003: Stack técnica — Node.js + Express/Fastify + PostgreSQL (Prisma) + React

**Status:** Aceito

## Contexto

Projeto de pequeno porte, mantido por uma única pessoa (estudante de TI), com familiaridade prévia em JavaScript/Node. Volume baixo (dezenas de registros/dia), criticidade não-crítica, orçamento próximo de zero (empresa sem setor de TI).

## Decisão

- **Backend:** Node.js, com Express ou Fastify.
- **Banco de dados:** PostgreSQL, com Prisma como ORM (modela as tabelas `Cliente`, `Rota`, `ParadaDaRota` e gera migrations automaticamente).
- **Frontend:** React.
- **Hospedagem:** Render ou Railway (tier gratuito/baixo custo, suportam Node + Postgres sem configuração de servidor).
- **API de otimização:** Google Routes API / Directions API com `optimize:true`, dentro do tier gratuito esperado para o volume do projeto (ver ADR-002 para o isolamento dessa dependência).

## Alternativas consideradas

- **Python + FastAPI:** teria vantagem futura caso o sistema precise migrar para um solver de otimização próprio (OR-Tools é nativo em Python), mas essa necessidade é hipotética e distante dado o baixo volume atual. Descartada em favor de reaproveitar conhecimento já existente em JS/Node, o que reduz o risco real do projeto (terminar a entrega).

## Consequências

- Desenvolvimento mais rápido por reaproveitar conhecimento existente.
- Se um dia for necessário um solver próprio em vez de API externa, a integração ficará levemente mais trabalhosa (chamar um processo Python a partir do Node, ou reescrever a lógica em JS/TS) — risco aceitável, mitigado pelo isolamento definido no ADR-002.
- Stack 100% JavaScript/TypeScript reduz context-switching entre linguagens para o único mantenedor do projeto.
