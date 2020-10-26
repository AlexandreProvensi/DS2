const express = require('express');
const routes = express.Router();
const OperacaoController = require('../controller/operacoes.controller');

routes.get('/adicao', OperacaoController.adicao);
routes.get('/subtracao', OperacaoController.subtracao);
routes.get('/multiplicacao', OperacaoController.multiplicacao);
routes.get('/divisao', OperacaoController.divisao);

module.exports = routes;