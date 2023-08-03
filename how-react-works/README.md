# How React Works behind the scenes

## Components, Instances, Elements

- Component: 
O component é a função base que iremos construir, normalmente fica em um arquivo separado e nele teremos suas funcionalidades, como variaveis, metodos e um retorno de um JSX.

- Component Instance
É a instância de um Componente, o componente só sera usado quando chamarmos uma instância dele que aparece no App.js. Podemos usar uma comparação com POO, em que o Component é a Classe e o Component Instance é o objeto. 
A Instance é quem cuida do ciclo de vida do componente e como ele será apresentado para o usuário, pois é nela que passamos todas as props e como queremos chamar o Component.
O Component Instance retorna um React Element.

- React Element
O React Element é a forma como o React faz para pegar todo esse código gerado pelo Component Instance quando é chamado e transforma-lo em um DOM Element. O React faz tudo isso por trás dos panos, convertendo o JSX em funções chamadas React.createElement() e passando as informações necessárias para o DOM, no ponto final.

- DOM Element
O DOM Element é o ponto final da jornada, é a representação visual do Component Instace no Browser, basicamento o HTML que vemos na página ou quando inspecionamos no console.

### De cima para baixo, é assim que o React trabalha por trás dos panos!