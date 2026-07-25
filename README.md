# SHOP PROJECT

_Tecnologias principais:_

- NodeJs
- Express
- Postgres
- Docker

## O que é o projeto?

API REST para gerenciamento de uma loja virtual, permitindo cadastro e autenticação de usuários, gerenciamento de produtos e controle de estoque.

## Funcionalidades

- Cadastro de usuário
- Sistema de login

## Como rodar o projeto localmente?

Primeiro clone o repositório na sua máquina:

> `git clone https://github.com/caue-dev0/shop_project.git`

Em seguida entre no repositório local e baixe as dependências do projeto utilizando o npm:

> `npm install`

para executar o projeto utilize o seguinte script:

> `npm run dev`

## Quais as rotas para as requisições?

### Rotas básicas de clientes

| Método | Endpoint  | Descrição         |
| ------ | --------- | ----------------- |
| GET    | /user     | Listar usuários   |
| GET    | /user/:id | Buscar usuário    |
| POST   | /user     | Criar usuário     |
| PUT    | /user/:id | Atualizar usuário |
| DELETE | /user/:id | Listar usuários   |

### Rotas básicas de login

| Método | Endpoint | Descrição              |
| ------ | -------- | ---------------------- |
| GET    | /profile | Verificar autenticação |
| POST   | /login   | Realizar login         |
