const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

//Efetuar a operação de adição
app.get('/adicao', (req, res) => {
    const valores = req.body;
    const resultado = valores.a + valores.b;

    res.send({ resultado: resultado });
});
//Efetuar a operação de subtração
app.get('/subtracao', (req, res) => {
    const valores = req.body;
    const resultado = valores.a - valores.b;

    res.send({ resultado: resultado });
});
//Efetuar a operação de multiplicação
app.get('/multiplicacao', (req, res) => {
    const valores = req.body;
    const resultado = valores.a * valores.b;

    res.send({ resultado: resultado });
});
//Efetuar a operação de divisão
app.get('/divisao', (req, res) => {
    const valores = req.body;
    const resultado = valores.a / valores.b;

    res.send({ resultado: resultado });
});

app.listen(port, () => {
    console.log('Running in port' + port)
})