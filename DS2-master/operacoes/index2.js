const express = require('express');
const bodyParser = require('body-parser');
const operacaoRoutes = require('./routes/operacoes.routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(operacaoRoutes);

app.listen(port, () => {
    console.log('Running in port '+ port)
});