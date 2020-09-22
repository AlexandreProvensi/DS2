const express = require('express');
const routes = express.Router();
const CidadeController = require('../controller/cidade.controller');

//Rotas raíz
routes.route('/')
    .get(CidadeController.find)
    .post(CidadeController.create);

//Rotas para elementos identificados
routes.route('/:id([0-9]+)')
    .get(CidadeController.findOne)
    .put(CidadeController.update)
    .delete(CidadeController.delete);

module.exports = routes;