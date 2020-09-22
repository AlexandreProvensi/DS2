const express = require('express');
const routes = express.Router();
const ClienteController = require('../controller/cliente.controller');

//Rotas raíz
routes.route('/')
    .get(ClienteController.find)
    .post(ClienteController.create);

//Rotas para elementos identificados
routes.route('/:id([0-9]+)')
    .get(ClienteController.findOne)
    .put(ClienteController.update)
    .delete(ClienteController.delete);

module.exports = routes;