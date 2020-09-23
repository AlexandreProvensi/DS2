const express = require('express');
const clienteController = require('../controller/cliente.controller');
const routes = new express.Router();

//Importa as rotas da aplicação
const cidadeRoute = require('./cidade.route');
const clienteRoute = require('./cliente.route');
const tabelaprecoRoute = require('./tabelapreco.route');


routes.use('/cidades', cidadeRoute);
routes.use('/tabelaprecos', tabelaprecoRoute);
routes.use('/clientes', clienteRoute);

module.exports = routes;