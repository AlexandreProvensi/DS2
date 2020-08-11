const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./pg-connection');
const pessoaRoutes = require('./routes/pessoa.route');

//Instanciar aplicação
const app = express();

//Porta da aplicação
const port = 3000;

//Adicionar o body-parser à aplicação
app.use(bodyParser.json());

//Rota para raíz
app.get('/', (req, res) => {
    res.send('<h1>Projeto de exemplo de conexão com Banco de Dados</h1>');
});

//Adiciona rota para tabela "pessoa"
app.use(pessoaRoutes);

//Estabelece uma conexão com o banco de dados
connection.connect()
    //Se deu certo, então...
    .then(() => {
        //Levanta o serviço na porta 3000
        app.listen(port, () => {
            console.log('Executando na porta: %s', port);
        });
    })
    //...senão, deu pau!
    .catch((error) => {
        console.log('Não foi possível conectar ao banco de dados: %s', error.message);
    });