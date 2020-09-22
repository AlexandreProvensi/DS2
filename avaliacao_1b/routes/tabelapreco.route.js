const express = require('express');
const routes = express.Router();
const TabelaPrecoController = require('../controller/tabelapreco.controller');

//Rotas raíz
routes.route('/')
    .get(TabelaPrecoController.find)
    .post(TabelaPrecoController.create);

//Rotas para elementos identificados
routes.route('/:id([0-9]+)')
    .get(TabelaPrecoController.findOne)
    .put(TabelaPrecoController.update)
    .delete(TabelaPrecoController.delete);

module.exports = routes;