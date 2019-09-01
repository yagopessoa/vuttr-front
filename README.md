# VUTTR - Front-end

## Sobre

Pequeno projeto desenvolvido para o Desafio de Front-End da [BossaBox](https://bossabox.com/).

A aplicação se chama VUTTR (Very Useful Tools to Remember). Trata-se de um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

Ela foi construída utilizando-se [Vue.js](https://vuejs.org/) com o auxilio da biblioteca de componentes [Vuetify](https://vuetifyjs.com/pt-BR/), sobrescrevendo as classes necessárias para atender a [este style guide](https://xd.adobe.com/spec/6a82c840-1813-4b23-6919-2ac91409d104-1cb3/).

## Como rodar o projeto

### Pré-requisitos

- Ter [Node.js](https://nodejs.org/en/download/) instalado (foi utilizada a versão 8.9.4).
- Baixar e rodar [esta API](https://gitlab.com/bossabox/challenge-fake-api/tree/master) criada para testes (instruções no link).

### Rodando o projeto em ambiente de desenvolvimento

1. Clone este repositório e abra um terminal na pasta raiz do projeto.
2. Execute o comando `npm install` para instalar as dependências.
3. Inicie a aplicação em modo de desenvolvimento com `npm run serve`.
4. Navegue até http://localhost:8080/ e veja a aplicação rodando.

### Testes

- Para rodar os testes, execute o comando: `npm run test:unit`

### Build para produção

1. Lembre-se de colocar o caminho correto da API (caso ela esteja hospedada em algum endereço e não local) na variável de ambiente `VUE_APP_API_PATH` no arquivo `.env` na raiz do projeto.
2. Execute `npm run build` para criar uma build otimizada para produção.
3. Pronto, basta fazer o upload da pasta `dist` para onde deseja hospedar a aplicação, como o [Netlify](https://netlify.com) por exemplo.
