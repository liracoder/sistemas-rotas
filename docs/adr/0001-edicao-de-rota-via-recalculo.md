# ADR-001: Edição de rota via recálculo, sem versionamento histórico

**Status:** Aceito

## Contexto

O motorista pode realizar mais de uma viagem no mesmo dia (ex: sai de manhã, volta, sai de novo à tarde). Cada viagem é uma Rota independente — a unicidade não é "uma rota por dia", é "uma rota por evento de saída" (identificada por data + horário de saída).

Imprevistos (cancelamento de cliente de última hora, inclusão de um cliente novo) podem exigir editar uma rota já salva, antes ou durante sua execução.

## Decisão

A edição de uma rota salva é feita através de um **novo recálculo via API de otimização** (não uma edição manual de ordem), e o resultado **sobrescreve** os dados da Rota e suas Paradas existentes — sem manter versões anteriores no histórico.

Na prática, "criar" e "editar" viram a mesma operação: `salvarRota(dados, rotaExistenteId?)`. Se um ID é passado, atualiza o registro existente; se não, cria um novo.

## Alternativas consideradas

- **Edição manual de ordem (drag-and-drop) sem recalcular:** descartada por ora — adiciona complexidade de UI sem benefício claro, já que o valor do sistema está em confiar no cálculo otimizado, não em ajuste manual.
- **Versionamento de rotas (manter histórico de edições):** descartado — o sistema não tem requisito de auditoria, e o volume/criticidade baixos definidos no levantamento de requisitos não justificam esse controle extra.

## Consequências

- A tabela `Rota` não precisa de campo de versão.
- `editar` = `recalcular + atualizar o mesmo registro`.
- Perde-se o rastro de "como a rota era antes do imprevisto" — aceitável dado o contexto.
- Reaproveita o mesmo componente de cálculo usado para criar rotas novas, sem precisar construir um fluxo de edição separado.
