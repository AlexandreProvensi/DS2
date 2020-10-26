//Importa os modulos externos
const express = require('express');
const bodyParser = require('body-parser');

//Instanciando a aplicação
const app = express();

//Adiciona o body-parser à aplicação (Permite receber elementos no corpo da requisição)
app.use(bodyParser.json());

//Posta da aplicação
const porta = 3000;

//Adicionando uma requisição para a rota raíz ('/') da aplicação
app.get('/', (req, res) => {
    res.send('<h1>Exemplo de implementação do GET e POST com JSON</h1>');
});

//Cria uma lista de compras (vetor)
var listaCompras = [];

//Alimentei a minha lista de compra
listaCompras.push({nome: 'Pão'});
listaCompras.push({nome: 'Leite'});
listaCompras.push({nome: 'Café'});
listaCompras.push({nome: 'Chá'});

//Rota que devolve a lista de compras
app.get('/listaDeCompra', (req, res) => {

    res.send(listaCompras);

});

//Rota que devolve um item da lista
app.get('/listaDeCompra/:param', (req, res) => {

    const param = req.params.param;

    //Verifico se existe esta posicao no vetor
    if (listaCompras[param-1]) {
        res.send(listaCompras[param-1]);
    } else {
        res.status(404).send({msg: 'Resource not found'});
    }

});

//Adicionar um item de compra
app.post('/listaDeCompra', (req,res) => {
    var item = req.body;

    listaCompras.push(item);

    res.status(201).send('created');
});


//Iniciando a aplicação na porta 3000
app.listen(porta, () => {
    console.log('Rodando na porta '+ porta);
});