const express = require('express');
const routes = express.Router();
const CidadeController = require('../controller/cidade.controller');

routes.get('/', CidadeController.find);
routes.post('/', CidadeController.create);

routes.get('/:id([0-9]+)', CidadeController.findOne);
routes.put('/:id([0-9]+)', CidadeController.update);
routes.delete('/:id([0-9]+)', CidadeController.delete);

module.exports = routes;