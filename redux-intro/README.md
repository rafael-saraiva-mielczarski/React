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

## Redux Modern Folder Structure

Um jeito moderno de separar os diversos Reducers é criando uma estrutura de pastas separada por _features_.Cada feature tem seu proposito e é bem especifica, nesse caso temos duas: _Accounts e Customers_. Dentro da pasta _features_, é criada a pasta especifica e que vai levar todos os componentes e demais arquivos relacionado a ela.

Com Redux, criando um arquivo chamado **(nome da feature)Slice** e nele passamos o _initialState(feature)_, a função _(feature)Reducer_ e suas _Actions Functions_.
Por convenção, o reducer é exportado como default e as actions functions somente exportadas.

Então, dentro do arquivo **Store** teremos a combinação dos dois reducers criando o RootReducer e passando ele como argumento para o Global Store, que depois é exportado para ser acessivel em todas as partes da aplicação.
