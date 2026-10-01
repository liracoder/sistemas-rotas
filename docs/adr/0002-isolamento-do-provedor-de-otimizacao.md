# ADR-002: Isolamento do provedor de otimização de rotas atrás de uma interface própria

**Status:** Aceito

## Contexto

O sistema depende de um serviço externo para calcular a melhor ordem de visita entre os clientes selecionados (ex: Google Routes API, Mapbox Optimization API, ou futuramente um solver próprio). Esse serviço está fora do controle da equipe, pode mudar de preço, limites de uso, formato de resposta, ou ser substituído por outro fornecedor no futuro.

## Decisão

O módulo de Planejamento de Rotas nunca chama a API externa diretamente. Em vez disso, ele depende de uma interface interna própria (`CalculadoraDeRota`), que define um contrato simples:

```
calcularMelhorOrdem(origem, listaDeClientes) -> { ordem, tempoEstimado }
```

A implementação concreta dessa interface (a integração específica com Google, Mapbox etc.) fica isolada em um módulo separado — **Otimização** — que é o único ponto do sistema que conhece detalhes do fornecedor escolhido.

## Alternativas consideradas

- **Chamar a API do fornecedor diretamente de dentro do módulo de Planejamento de Rotas:** descartada — criaria acoplamento direto entre a lógica de negócio e os detalhes de um fornecedor externo específico (formato de requisição, autenticação, tratamento de erros daquela API).

## Consequências

- Trocar de fornecedor (ex: migrar para um solver próprio caso o volume cresça) exige mudança em um único módulo.
- Facilita testes automatizados: a `CalculadoraDeRota` pode ser simulada (mock) sem depender de chamadas reais à internet.
- Aplica o princípio GRASP de **Variação Protegida** — o ponto de instabilidade conhecido (dependência de serviço externo) é isolado atrás de uma interface estável.
- Pequeno custo adicional de uma camada de abstração extra — justificado, já que esse é o ponto mais provável de mudança no projeto.
