# How React Works behind the scenes

## Components, Instances, Elements

- **COMPONENT**

É a função base que iremos construir, normalmente fica em um arquivo separado e nele teremos suas funcionalidades, como variaveis, metodos e um retorno de um JSX.

<img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/ec43140f-2a8d-442f-9590-b8d447a4ce04" alt="componet" width="450">
  
- **COMPONENT INSTANCE**

É a instância de um Componente, o componente só sera usado quando chamarmos uma instância dele que aparece no App.js. Podemos usar uma comparação com POO, em que o Component é a Classe e o Component Instance é o objeto. 
A Instance é quem cuida do ciclo de vida do componente e como ele será apresentado para o usuário, pois é nela que passamos todas as props e como queremos chamar o Component.
O Component Instance retorna um React Element.

<img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/76f0dc5e-7078-4587-ab58-506aeddc49c5" alt="componet instance" width="450">

- **REACT ELEMENT**
  
É a forma como o React faz para pegar todo esse código gerado pelo Component Instance quando é chamado e transforma-lo em um DOM Element. O React faz tudo isso por trás dos panos, convertendo o JSX em funções chamadas React.createElement() e passando as informações necessárias para o DOM, no ponto final.

<img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/7c59d617-6d77-41a0-9643-86c8433ae3a1" alt="react element" width="450">

- **DOM ELEMENT**
  
É o ponto final da jornada, é a representação visual do Component Instace no Browser, basicamento o HTML que vemos na página ou quando inspecionamos no console.

<img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/f6ece100-c603-4f1a-8d1e-717914c3c1b0" alt="dom element" width="450">

### De cima para baixo, é assim que o React trabalha por trás dos panos!
