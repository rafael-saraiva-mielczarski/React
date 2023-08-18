# useReducer

O useReducer é um hook que sempre recebe dois parametros, uma função reducer e um estado inicial, normalmente sendo um objeto. Essa função Reducer tem que ser criada no top level e ela é quem comanda o Hook, ela recebe dois parametros, o state e a action, o state é estado inicial que é passado no hook, já o actino pode ser o que quiser, é a logica do hook. Necessariamente se tem um action.type, para especificar o que será feito e um retorno que contem esse resultado, podendo retornar o state e alguma soma ou somente o action.payload.

Para chamar essa função se usa o dispatch dentro de alguma outra função dentro do componente. O Dispatch recebe dois argumentos, o type, o qual identifica qual ação tem que ser feita, e o payload, que pode ser algum número ou algum setter, caso seja um número, não é necessário passar o action.payload no dispatch, pode ser escrito no retorno da reducer, caso seja algo que a reducer não tem acesso, ai sim temos que passar o action.payload.

## Por que usar?

Quando se tem um componente que tenha muitos estados nele, é mais facil centralizar toda a lógica de tratamento desses estados em uma unica função, a **Reducer**. Ela tira a lógica do componente, isola em uma unica função, deixando ele mais fácil de ler e entender.
