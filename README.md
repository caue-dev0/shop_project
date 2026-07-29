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

```bash
git clone https://github.com/caue-dev0/shop_project.git

cd shop_project

npm install

docker compose up -d

npm run dev
```

## Endpoints da API

### Rotas de clientes

Corpo da requisição

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "12345678"
}
```

| Método | Endpoint   | Descrição          |
| ------ | ---------- | ------------------ |
| GET    | /users     | Listar usuários    |
| GET    | /users/:id | Buscar usuários    |
| POST   | /users     | Criar usuários     |
| PUT    | /users/:id | Atualizar usuários |
| DELETE | /users/:id | Remover usuários   |

### Rotas de produtos

Corpo da requisição

```json
{
  "name": "Televisão",
  "price": 1499,99
}
```

| Método | Endpoint      | Descrição          |
| ------ | ------------- | ------------------ |
| GET    | /products     | Listar produtos    |
| GET    | /products/:id | Buscar produtos    |
| POST   | /products/:id | Criar produtos     |
| PUT    | /products/:id | Atualizar produtos |
| DELETE | /products/:id | Remover produtos   |

### Rotas de autenticação

Corpo da requisição para login:

```json
{
  "email": "maria@email.com",
  "password": "12345678"
}
```

| Método | Endpoint | Descrição              |
| ------ | -------- | ---------------------- |
| GET    | /profile | Verificar autenticação |
| POST   | /login   | Realizar login         |

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
