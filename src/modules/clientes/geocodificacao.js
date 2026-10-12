// Isolado do resto do módulo Clientes de propósito: é o único ponto que vai falar
// com a API de geocodificação (Google Geocoding) quando implementarmos de verdade.
// Por enquanto, um stub — devolve coordenadas fixas pra não travar o fluxo
// enquanto não conectamos a API real. Trocar aqui dentro quando chegar a hora.
export async function geocodificar(endereco) {
  // TODO: substituir pela chamada real à Google Geocoding API
  console.warn(`[geocodificacao] usando stub para: "${endereco}"`);
  return { latitude: 0, longitude: 0 };
}
