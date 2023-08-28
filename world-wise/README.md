### REACT ROUTER

Biblioteca responsável pela navegação entre diferente componentes em uma única página. Linkando diferentes URLs a diferentes Views, habilitando o usuário uma experiencia de navegar entre telas e deixando elas sincronizadas com a url da página

## SINGLE PAGE APPLICATION

Aplicações que rodam somente no client side, as routes são responsaveís por mudar a tela de acordo com a URL, o JS é usado para fazer o update na página(DOM), porém a página nunca é completamente recarregada, possibilitando um experiência de usuário agradavel, como se fosse um app nativo.

### _Usuário clica no router link -> URL muda -> DOM é atualizado_

### Nested Routes

Ex: site.com/rota/**nestedRoute**
Nested Routes são rotas que estão dentro de uma outra rota. Para setar uma nested route, é preciso escrever dentro da route pai as routes filhas, parecido com o children. Para receber essa nested route, é preciso usar o <Outlet/> dentro do componente que recebe essas rotas. Para setar uma nested route ou qualquer route como padrão, usa-se o index prop na declaração da route.
Exemplos disso estão no App.jsx e AppLayout.jsx

### useParams

`useParams` é um hook do React-Router que possibilita usar os parametros que se encontram na url para gerenciar o estado, por exemplo, mandar uma url especifica para um amigo site.com/rota/cidades/**123455**. Se cria uma rota normal com um `/:Parametro` e o componente que será renderizado quando o navegado para esse route e dai voce cria um <Link /> no componente onde se encontram os dados que seram navegados.

Nesse app o fluxo é o seguinte:
<Route path="cities/:id" renderiza = <CityItem/>> -> dentro de <CitiesList>, cada <CityItem> tem um <Link> com um id, respectivo a cidade, quando o usuário clica em um desses links, é redirecionado ao componente <CityItem> que mostra os detalhes da cidade e o URL fica `site.com/rota/cidades/12345`

`useSearchParams` é outro hook do React-Router, quando construimos uma URL personalizada, podemos inserir os dados que achamos válido para o caso de uso, exemplo: `${id}?lat=${position.lat}&lng=${position.lng}`.
Usando o useSearchParams, é possivel procurar por dados através da URL, com um useSearchParams.get(nome do dado a ser buscado na URL, lat ou lng), podendo usar esses dados da maneira que quiser na aplicação.

<hr/>

## Tipos de estilização no React

    Opção de Estilização        Aonde               Como            Escopo       Baseado em
    Inline CSS               JSX Element          Style prop       JXS local        CSS
    CSS ou SASS            Arquivo Externo      Classname prop     Todo app         CSS
    CSS Modules         Um file por Component   Classname prop     Componente       CSS
    CSS-IN-JS 💅         Arq ex ou Comp file    Cria novo Comp     Componente    JavaScript
    Utility-first CSS        JSX Element        Classname prop     JSX element      CSS

    Alternativo para não escrever CSS pode ser uma Lib UI: MUI, Chakra UI, Mantine
