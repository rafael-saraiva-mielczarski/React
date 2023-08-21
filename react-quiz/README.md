# useReducer

O useReducer é um hook que sempre recebe dois parametros, uma função reducer e um estado inicial, normalmente sendo um objeto. Essa função Reducer tem que ser criada no top level e ela é quem comanda o Hook, ela recebe dois parametros, o state e a action, o state é estado inicial que é passado no hook, já o actino pode ser o que quiser, é a logica do hook. Necessariamente se tem um action.type, para especificar o que será feito e um retorno que contem esse resultado, podendo retornar o state e alguma soma ou somente o action.payload.

Para chamar essa função se usa o dispatch dentro de alguma outra função dentro do componente. O Dispatch recebe dois argumentos, o type, o qual identifica qual ação tem que ser feita, e o payload, que pode ser algum número ou algum setter, caso seja um número, não é necessário passar o action.payload no dispatch, pode ser escrito no retorno da reducer, caso seja algo que a reducer não tem acesso, ai sim temos que passar o action.payload.

## Por que usar?

Quando se tem um componente que tenha muitos estados nele, é mais facil centralizar toda a lógica de tratamento desses estados em uma unica função, a **Reducer**. Ela tira a lógica do componente, isola em uma unica função, deixando ele mais fácil de ler e entender.


## useReducer X useState

- **useReducer** 
 - Ideal quando tiverem multiplos estados e grande complexidade
 - A lógica do estado fica em um único lugar fora dos componentes, a *func reducer* 
 - Mudança de estado declarativa, as mudanças são mapeadas por nome nas actions, mudança de multiplos estados ao mesmo tempo escrever somente *dispatch({type: "x"})*
 - Pode ser um pouco confusa de entender e implementar

- **useReducer**: 
 - Ideal quando tiverem estados independetes e únicos
 - Lógica para atualizar os estados esta nos event handlers ou effects, espalhadas por um ou vários componentes
 - Estado somente é atualizado por um func setter, retornado do useState -> *setState()*
 - Mudança de estado imperativa, tendo que declarar cada *set* usado
 - Fácil de entender e implementar


## Quando usar o useReducer?
Perguntando essas questões fica mais fácil de entender quando usar cada um desses hooks

              Preciso de só um pedaço de estado? 
                  SIM -> useState()    NÃO
                                        |
                                        |
                Esses estados frequentemente se atualizam juntos?
                            SIM                            NÃO
                             |                              |  
    Esta disposto a escrever um codigo mais complexo?       |
        SIM -> useReducer()     NÃO -> useState()           |
                                                            |
                            Tem 3, 4 ou mais estados relacionados, incluindo objetos?
                                        SIM                                    NÃO
                                         |                                      |
                    Esta disposto a escrever um codigo mais complexo?           |
                        SIM -> useReducer()     NÃO -> useState()               |
                                                                                |
                                    Muitos event handlers deixando os componentes grandes e confusos?
                                                    SIM                 NÃO -> useState()
                                                     |
                            Esta disposto a escrever um codigo mais complexo?         
                                SIM -> useReducer()     NÃO -> useState() 
