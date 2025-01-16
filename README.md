# Blog Postagens com Node

Bem-vindo ao repositório **Blog Postagens com Node**! Este projeto é uma aplicação web de blog desenvolvida utilizando Node.js, Express, MongoDB e Handlebars. A aplicação permite que os usuários criem, visualizem, editem e excluam postagens de blog de forma dinâmica.

## Funcionalidades

- **Criação de Postagens**: Usuários podem criar novas postagens de blog através de um formulário intuitivo.
- **Visualização de Postagens**: Todas as postagens são exibidas na página inicial, permitindo que os usuários leiam o conteúdo completo.
- **Edição de Postagens**: Postagens existentes podem ser editadas para atualizar o conteúdo conforme necessário.
- **Exclusão de Postagens**: Usuários têm a opção de excluir postagens que não são mais relevantes.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript assíncrono orientado a eventos.
- **Express**: Framework web para Node.js que facilita o gerenciamento de rotas e middleware.
- **MongoDB**: Banco de dados NoSQL orientado a documentos para armazenamento das postagens.
- **Handlebars**: Motor de templates para gerar HTML com dados dinâmicos.

## Acesse o Projeto Online
Você pode acessar a aplicação em funcionamento no seguinte link:
https://blog-postagens.onrender.com

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone este repositório**:

   ```bash
   git clone https://github.com/Keyllian7/Blog-Postagens.git
   ```

2. **Navegue até o diretório do projeto**:

   ```bash
   cd Blog-Postagens
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

   Substitua `your_mongodb_connection_string` pela string de conexão do seu banco de dados MongoDB.

5. **Inicie o servidor**:

   ```bash
   npm start
   ```

6. **Acesse a aplicação**:

   Abra o navegador e visite `http://localhost:3000` para interagir com o blog.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
Blog-Postagens/
├── config/             # Configurações da aplicação
├── helpers/            # Funções auxiliares
├── models/             # Modelos do Mongoose
├── public/             # Arquivos estáticos (CSS, JS, imagens)
├── routes/             # Definições de rotas
├── views/              # Templates Handlebers
├── app.js              # Arquivo principal da aplicação
├── package.json        # Dependências e scripts
└── .gitignore          # Arquivos e pastas ignorados pelo Git
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. Para maiores informações, consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por [Keyllian Azevedo](https://github.com/Keyllian7) 
