//Importa os modulos externos
const express = require('express');

//Instanciando a aplicação
const app = express();

//Posta da aplicação
const porta = 3000;

//Adicionando uma requisição para a rota raíz ('/') da aplicação
app.get('/', (req, res) => {
    res.send('<h1>Exemplo de implementação DELETE com JSON</h1>');
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

//Exclui um recurso do vetor
app.delete('/listaDeCompra/:param', (req,res) => {

    const param = req.params.param;

    if (listaCompras[param-1]) {
        listaCompras.splice(param-1, 1);
        res.status(204).send();
    } else {
        res.status(404).send({msg: 'Resource not found'});
    }

})

//Iniciando a aplicação na porta 3000
app.listen(porta, () => {
    console.log('Rodando na porta '+ porta);
});