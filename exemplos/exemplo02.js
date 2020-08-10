//Importa o express
const express = require('express');

//Instanciando a aplicação
const app = express();

//Posta da aplicação
const porta = 3000;

//Adicionando uma requisição para a rota raíz ('/') da aplicação
app.get('/', (req, res) => {
    res.send('<h1>Exemplo Utilizando o Método GET retornando uma lista de String</h1>');
});

//Cria uma lista de compras (vetor)
var listaCompras = [];

//Alimentei a minha lista de compra
listaCompras.push('Pão');
listaCompras.push('Leite');
listaCompras.push('Café');
listaCompras.push('Chá');

//Rota que devolve a lista de compras
app.get('/listaDeCompra', (req, res) => {

    res.send(listaCompras);

});

//Rota que devolve o item indicado na URL como parametro (:item)
app.get('/listaDeCompra/:item', (req, res) => {

    var item = req.params.item;

    var encontrado = listaCompras[item - 1];

    if (encontrado) {
        res.send(encontrado);
    } else {
        res.status(404).send('not found');
    }

});


//Iniciando a aplicação na porta 3000
app.listen(porta, () => {
    console.log('Rodando na porta ' + porta);
});