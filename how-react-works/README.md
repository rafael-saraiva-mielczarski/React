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

### _De cima para baixo, é assim que o React trabalha por trás dos panos!_

<hr/>

# Como funciona o processo de Rendering

## Render Triggering -> Render Phase -> Commit Phase -> Browser Paint

- **RENDER TRIGGERING** <img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/3c2eee2f-f10b-4087-a497-edeffbda14e5512/reactjs_logo_icon_170805.png" width="60">

Como é a fase inicial, o ativamento da renderização é o que inicia o processo. Essa _ativação só se da de duas formas_, uma quando a aplicação é inicializada, **Initial Render**, e outra quando tem algum **update no estado** de algum componente.
Esse processo, apesar de não parecer, é ativado em todo a arvore de componentes de aplicação, porém só altera o que for necessário e relativo ao estado alterado.

- **RENDER PHASE** <img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/3c2eee2f-f10b-4087-a497-edeffbda14e5512/reactjs_logo_icon_170805.png" width="60">

Ativados após alguma mudança de estado, a fase de renderização é iniciada. Quando o _arvore de componentes_ é criada, também é criado uma _arvore de React Elements_, conhecida como "Virtual DOM", e quando ocorre a alteração de estado em um componente, a arvore de React Elements atualiza todos os componentes filhos do componente que foi mutado. Feito isso, acontece o processo de **Reconciliação**, onde ele possibilita que o DOM não seja todo recarregado na mudança de estado, somente a parte que nos interessa. O reconciliador usado pelo React é o **Fiber**, esse possui uma _arvore Fiber_, algo interno que possui todas as instancias de componentes e os elementos DOM e que não é recriado em cada re-renderização.
No final, quando ocorre uma mudança de estado, a nova _arvore de React Elements_ é comparada com a _arvore inicial do Fiber_ e é feito o processo de **Reconciliação e Diffing**, resultando em uma _arvore fiber atualizada_, a qual passa somente os elementos da DOM que precisam ser realmente alterados, dentro de uma _Lista de Efeitos_ ou lista de updates da DOM, que será utilizada na próxima fase do processo de renderização.

- **COMMIT PHASE** <img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/3c7098ba-c4e7-44c8-99af-f130b422df21" width="60">

Nesse fase, o React escreve para o DOM todas as alterações necessárias, pegadas da _Lista de Efeitos_ que foi o resultado da ultima fase. Essa etapa ocorre sincronamente, atualizando o DOM todo de uma vez só, assegurando que o DOM nunca vai mostrar uma UI parcialmente ou inconsistente. Esse é o **grande trunfo da fase de Renderização**, _poder fazer todas as atualizações necessárias a DOM de maneira asincrona e retornando como resposta tudo de uma vez só_, por isso que ocorre a separação entre essas duas fases.
Então, após completa essa fase, a _arvore Fiber atualizada_, que foi utilizada para passar os updates da DOM, se torna a _arvore Fiber base_ para o próximo ciclo de renderização, econimizando muito tempo e trabalho no processo.

- **BROWSER PAINT** <img src="https://github.com/rafael-saraiva-mielczarski/React-Course/assets/100975439/64e71729-2968-435d-af1b-3f6f77039189" width="80">

Após receber as atualizações no DOM da fase passada, o navegador percebe isso e altera a UI conforme o que foi pedido.

<hr />

##**Key Prop**

Muito importante para que o processo de renderização e diffing consigam identificar as instaâncias de componentes unicamente. Ele é muito usado em listas para diferenciar as instâncias e também ajuda na tarefa de re-renderização, avisando, caso algum novo item seja adicionado a uma lista, que ele não renderize toda a lista novamente e apenas renderize o novo item. O *Key* também pode ser usado para resetar o estado das instâncias dos componentes também.

<hr />

##**COMPONENT LIFE CYCLE**

- **Mount / Initial Render**
Quando a instância do componente é renderizada pela primeira vez, o novo estado e props do mesmo são todos criados

- **Re-Render**
Vai acontecer quando tiver alguma alteração na instância do componente, sendo essa uma mudança de estado, props, re-renderização de um componente pai ou mudança de contexto. Essa fase pode ou não acontecer.

- **Unmount**
Quando a instância do componete não é mais necessária ela "morre", destruindo o componente e seu estado ou props relativos. Isso pode acontecer quando mudamos de tela ou quando a aplicação é fechada.
