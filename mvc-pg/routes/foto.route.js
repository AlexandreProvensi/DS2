const express = require('express');
const routes = express.Router();
const FotoController = require('../controller/foto.controller');

routes.get('/', FotoController.find);
routes.post('/', FotoController.create);

routes.get('/:id([0-9]+)', FotoController.findOne);
routes.put('/:id([0-9]+)', FotoController.update);
routes.delete('/:id([0-9]+)', FotoController.delete);

module.exports = routes;