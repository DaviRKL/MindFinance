# Projeto de Controle de Finanças Pessoais

Este é um projeto de controle de finanças pessoais que utiliza Node.js com ExpressJS e MySQL no backend, e Next.js no frontend. O sistema permite registrar, visualizar, editar e remover receitas e despesas, além de categorizar as mesmas. Possui login e cadastro de usuários. As receitas e despesas têm descrição e valor, com um histórico mostrando o saldo atual. Os usuários têm nome, foto, email e senha.

## Instruções para Rodar o Projeto

### Requisitos

- Docker
- Docker Compose
- Node.js

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Configurando o Frontend

    Entre na pasta frontendmind:

    bash

cd frontendmind

Instale as dependências:

bash

npm install

Construa o projeto:

bash

npm run build

Inicie o servidor de desenvolvimento:

bash

    npm start

Configurando o Backend e o Banco de Dados

    Volte para a raiz do projeto:

    bash

cd ..

Suba os serviços do backend e do banco de dados com Docker Compose:

bash

    docker compose up --build

Estrutura do Docker Compose

O arquivo docker-compose.yml está configurado da seguinte maneira:

yaml

version: '3.8'

services:
  db:
    image: mysql/mysql-server:latest
    container_name: my-mysql
    restart: always
    environment:
      - MYSQL_DATABASE=mydatabase
      - MYSQL_ROOT_PASSWORD=root_password
    ports:
      - '3306:3306'
    volumes:
      - mysql-volume:/var/lib/mysql

  nodeapp:
    build: .
    container_name: nodeapp
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: root_password
      DB_DATABASE: mydatabase
    ports:
      - "3000:3000"

  # frontend:
  #   build:
  #     context: ../frontendmind
  #   container_name: frontend
  #   ports:
  #     - "3030:3030"

volumes:
  mysql-volume:
    driver: local

Acessando a Aplicação

    O frontend estará disponível em: http://localhost:3030
    O backend estará disponível em: http://localhost:3000

Observações

    Certifique-se de que as portas 3306, 3000 e 3030 estão livres em seu sistema.
    Modifique o arquivo docker-compose.yml conforme necessário para adaptar ao seu ambiente de desenvolvimento.
