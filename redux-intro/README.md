# Redux

_Store_ global é atualizado -> Todos componentes que consumem são re-renderizados

- É uma biblioteca externa feita para gerenciar estados globais na aplicação
- Biblioteca "standalone", mais facilmente integrada com aplicações React através do react-redux
- Todos os estados globais são guardados em um **store** acessivel globalmente, que é atualizado pelo uso da **actions**(tipo o useReducer)
- Conceitualmente parecido com o ContextAPI + useReducer
- Duas versões: Redux Classico, Redux Toolkit Moderno

## Ciclo do Redux

Chamado em um event handler ativa uma action -->
Chamada a action, é feito o dispatch dela para o store -->
O store é onde se concentram todos os reducers da aplicação, nele a action que foi dispatched vai ser pega pelo reducer que contem aquele tipo, tratando do estado atual e retornando um novo estado -->
Esse novo estado gerado é atualizado causando uma re-renderização dos componentes que estão consumindo aquele estado
