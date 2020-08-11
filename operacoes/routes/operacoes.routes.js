const express = require('express');
const routes = express.Router();
const OperacaoController = require('../controller/operacoes.controller')

//Efetuar a operação de adição
routes.get('/adicao', OperacaoController.adicao);
//Efetuar a operação de subtração
routes.get('/subtracao', OperacaoController.subtracao);
//Efetuar a operação de multiplicação
routes.get('/multiplicacao', OperacaoController.multiplicacao);
//Efetuar a operação de divisão
routes.get('/divisao', OperacaoController.divisao);
module.exports = routes;