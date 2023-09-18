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

## Como usar o estado na aplicação?

Para ter acesso aos dados do store, fazemos algo bem parecido com o ContextAPI:

- Primeiramente instala-se o `react-redux`
- Importa o store da sua aplicação e o Provider do react-redux, tudo isso dentro do arquivo App
- Chama a tag `<Provider>` em volta da tag `<App>` e chama o prop _store_ passando o store da aplicação nele.
- Pronto, agora é só usar o store nos componentes que precisa

## Como selecionar o estado e o dispatch do Store nos seus componentes?

Para ter acesso aos dados e o dispatch devemos seguir esses passos:

- Quando se quer utilizar algum estado, é necessário chamar o `useSelector()` hook fornecido pelo react-redux.
- O `useSelector()` necessita de uma callback function, normalmente se faz assim `useSelector(store => store.x)` também é comum ver usar _state_ invés de store
- O `store.x` é referente ao **nome do store** que foi dado no _RootReducer_, nesse caso temos: account e customer
- Feito isso, atribua esse valor do `store.nomeDoStore.valor` a uma variavel, para que se possa inserir onde quiser.

### Dispatch action

- Precisa chamar o `useDispatch()` hook fornecido pelo react-redux
- Depois é só chamar o dispatch e especificar a action que deseja
- Lembrando das Action function que criamos, você vai ter que importar as que forem ser usadas também

## Redux Middleware

Como fazer requisições para uma API no Redux?

Componente --> Dispatch --> _Middleware_ --> Store

**Middleware** é uma função que fica entre o dispatch de uma ação e o store com os reducers, ela roda o código depois da ação ser dispatched e antes dela chegar no reducer. É o lugar perfeito para fazer qualquer side effect na aplicação.

**Thunks** é o middleware para chamadas de API mais usado no Redux.

<hr/>

# Redux Toolkit

- É o jeito moderno de escrever e usar o Redux
- Opinativo, forçando a comunidade a escrever Redux com boas práticas
- Totalmente compativel com o Redux clássico, podendo usar os dois em uma aplicação
- Menos código "Boilerplate", precisa escrever menos para ter o mesmo resultado
- Possibilita escrever código que "altera" o estado dentro do reducer
- Action creaters são criados automaticamente
- Faz o setup automaticamente do Thunk e do Redux Devtools
