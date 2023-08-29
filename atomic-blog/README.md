# CONTEXT API

Sistema para passar dados para componentes sem fazer prop drilling, deixando "transmitir" o estadp global para todo o app. Toda vez que o value é atualizado, os consumers da aplicação são re-renderizados

### Providers
Da acesso ao `value` para todos os componentes filhos, normalmente fica no top level da aplicação, no App component 

### value
Dados que queremos disponiveis em toda a aplicação, normalmente são estados e funções. Passamos esse value para o provider para que tenhamos acesso em toda aplicação.

### Consumers
São todos os componentes que usam o `value` que esta no contexto fornecido pelo `Provider`. Ele se encontra em qualquer componente que deseja ter acesso a esse context, podendo ter vários consumers
