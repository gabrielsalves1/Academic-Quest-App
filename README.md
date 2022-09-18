# Executando o projeto:

Efetue a instalação do NodeJS.

Clone o projeto em seu computador.

Instale as dependências do projeto:
- npm install

Execute o projeto:
- npm start

Para efetuar login na aplicação, utilize os seguintes dados:
```
e-mail: cr7@gmail.com
senha: 123456
```

# Para executar o projeto através do Docker:

Instale o Docker.

Na pasta base do projeto, digite o seguinte comando:

```
docker build -t academic-quest .
```

A imagem do projeto será criada, em seguida, execute o comando do composer para criar o container:

```
docker compose up -d
```

Para verificar se o projeto está rodando e em qual porta ele está sendo executado:

```
docker ps
```