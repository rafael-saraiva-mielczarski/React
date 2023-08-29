# CONTEXT API

Sistema para passar dados para componentes sem fazer prop drilling, deixando "transmitir" o estadp global para todo o app. Toda vez que o value é atualizado, os consumers da aplicação são re-renderizados

### Providers

Da acesso ao `value` para todos os componentes filhos, normalmente fica no top level da aplicação, no App component

### value

Dados que queremos disponiveis em toda a aplicação, normalmente são estados e funções. Passamos esse value para o provider para que tenhamos acesso em toda aplicação.

### Consumers

São todos os componentes que usam o `value` que esta no contexto fornecido pelo `Provider`. Ele se encontra em qualquer componente que deseja ter acesso a esse context, podendo ter vários consumers

<hr />

## Tipos de Estado

### 1 - Acessibilidade do Estado:

_Se o componente for renderizado duas vezees, alguma atualização em um deles deve refletir no outro?_ **NÃO: Local SIM: Global**

- Estado Local: Necessário em um ou menos componentes, somente acessivel no componente e seus filhos

- Estado Global: Possivelmente necessário em vários componentes, acessivel a todos componentes da aplicação

### 2 - Dominio do Estado

- Estado Remoto: Dados da aplicação que são carregados de um servidor remoto(API), normalmente assincrono, necessita de re-fetching e atualização

- Estado UI: Todo o restante, Temas, filtros, formulários, normalmente sincronizado e guardado na aplicação

## Opções para guardar o estado

        Onde Colocar                    Como colocar                   Quando Colocar
      Componente Local         useState, useReducer ou useRef           Estado Local
       Componente Pai          useState, useReducer ou useRef         Lifting up State
          Contexto           ContextAPI + useState ou useReducer        Estado Global (preferencialmente UI)
         Lib Externa        Redux, React Query, SWR, Zustand, etc.      Estado Global(Remoto e UI)
            URL                         React Router                    Estado Global, passado entre páginas
          Navegador          Local Storage, Session Storage, etc.       Guardando dado do usuário no navegador

## Como gerenciar os diferentes tipos de estado na prática?

                                ESTADO LOCAL                         ESTADO GLOBAL

                        useState, useReducer, useRef       ContextAPI + useState ou useReducer
    ESTADO UI                                                 Redux, Zustand, Recoil, etc.
                                                                    React Router

                        fetch + useEffect + useState       ContextAPI + useState ou useReducer
    ESTADO REMOTO               ou Reducer                    Redux, Zustand, Recoil, etc.
                          em pequenas aplicações         Ferramentas altamente especilizadas em 
                                                                gerenciar estado remoto:
                                                               React Query, SWR, RTK Query
