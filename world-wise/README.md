### REACT ROUTER

Biblioteca responsável pela navegação entre diferente componentes em uma única página. Linkando diferentes URLs a diferentes Views, habilitando o usuário uma experiencia de navegar entre telas e deixando elas sincronizadas com a url da página

## SINGLE PAGE APPLICATION

Aplicações que rodam somente no client side, as routes são responsaveís por mudar a tela de acordo com a URL, o JS é usado para fazer o update na página(DOM), porém a página nunca é completamente recarregada, possibilitando um experiência de usuário agradavel, como se fosse um app nativo.

### _Usuário clica no router link -> URL muda -> DOM é atualizado_

<hr/>

## Tipos de estilização no React

    Opção de Estilização        Aonde               Como            Escopo       Baseado em
    Inline CSS               JSX Element          Style prop       JXS local        CSS
    CSS ou SASS            Arquivo Externo      Classname prop     Todo app         CSS
    CSS Modules         Um file por Component   Classname prop     Componente       CSS
    CSS-IN-JS 💅         Arq ex ou Comp file    Cria novo Comp     Componente    JavaScript
    Utility-first CSS        JSX Element        Classname prop     JSX element      CSS

    Alternativo para não escrever CSS pode ser uma Lib UI: MUI, Chakra UI, Mantine
