// Módulo Otimização — isola o fornecedor de cálculo de rota (ADR-002).
// Nenhum outro módulo deve chamar a API externa diretamente; todos passam
// por calcularMelhorOrdem() abaixo.
//
// TODO (próxima etapa): implementar a chamada real à Google Directions API
// com optimizeWaypoints: true. Por enquanto, só o contrato (assinatura) está
// definido, para o módulo de Planejamento de Rotas poder ser escrito contra
// essa interface sem esperar a integração.

/**
 * @param {{ latitude: number, longitude: number }} origem
 * @param {Array<{ id: string, latitude: number, longitude: number }>} clientes
 * @returns {Promise<{ ordem: string[], tempoEstimadoMin: number[] }>}
 *   ordem: lista de ids de cliente na sequência otimizada de visita
 *   tempoEstimadoMin: tempo estimado (em minutos) até cada parada, no mesmo índice de "ordem"
 */
export async function calcularMelhorOrdem(origem, clientes) {
  throw new Error("calcularMelhorOrdem ainda não implementada — próxima etapa do projeto.");
}
