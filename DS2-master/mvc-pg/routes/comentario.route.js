const express = require('express');
const routes = express.Router();
const ComentarioController = require('../controller/comentario.controller');

routes.get('/', ComentarioController.find);
routes.post('/', ComentarioController.create);

routes.get('/:id([0-9]+)', ComentarioController.findOne);
routes.put('/:id([0-9]+)', ComentarioController.update);
routes.delete('/:id([0-9]+)', ComentarioController.delete);

module.exports = routes;