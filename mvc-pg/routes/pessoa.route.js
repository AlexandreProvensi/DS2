const express = require('express');
const routes = express.Router();
const PessoaController = require('../controller/pessoa.controller');

//Listar todos os registros
routes.get('/pessoas', PessoaController.find);

module.exports = routes;