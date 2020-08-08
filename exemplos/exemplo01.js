//Importa o express
const express = require('express');

//Instanciando a aplicação
const app = express();

//Adicionando uma requisição para a rota raiz ('/') da aplicação
app.get('/', (req, res) => {
    res.send('<h1>Its Work!</h1>')
});

//Nova rota
app.get('/listaDeCompras', (req, res) => {

    var lista = '<ol>'
    lista += '<li>Pão</li>';
    lista += '<li>Leite</li>';
    lista += '<li>Café</li>';
    lista += '</ol>';

    res.send(lista);
})

//Nova rota com parâmetro
app.get('/listaDeCompras/:item', (req, res) => {

    res.send('Você está solicitando o item:' + req.params.item);

})


//Iniciando a aplicação na porta 3000
app.listen(3000, () => {
    console.log('Rodando na porta 3000')
});