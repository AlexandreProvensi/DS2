const express = require('express');
const routes = express.Router();
const CurtidaController = require('../controller/curtida.controller');

routes.get('/', CurtidaController.find);
routes.post('/', CurtidaController.create);

routes.get('/:id([0-9]+)', CurtidaController.findOne);
routes.put('/:id([0-9]+)', CurtidaController.update);
routes.delete('/:id([0-9]+)', CurtidaController.delete);

module.exports = routes;