const express = require('express');
const routes = express.Router();
const PessoaController = require('../controller/pessoa.controller');

//Listar todos os registros
routes.get('/', PessoaController.find);

//Adicionar um item aos registros
routes.post('/', PessoaController.create);

//Retorna apenas o item com o ID passado por parametro na URI
routes.get('/:id([0-9]+)', PessoaController.findOne);

//Altera o item com o ID passado por parametro na URI
routes.put('/:id([0-9]+)', PessoaController.update);

//Remove o item com o ID passado por parametro na URI
routes.delete('/:id([0-9]+)', PessoaController.delete);

module.exports = routes;