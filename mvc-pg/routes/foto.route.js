const express = require('express');
const routes = express.Router();
const FotoController = require('../controller/foto.controller');

//Rotas raíz
routes.route('/')
    .get(FotoController.find)
    .post(FotoController.create);

//Rotas para elementos identificados
routes.route('/:id([0-9]+)')
    .get(FotoController.findOne)
    .delete(FotoController.delete);

//Rota para comentários
routes.get('/:id([0-9]+)/comentarios', FotoController.getComentarios);

//Rota para curtidas
routes.get('/:id([0-9]+)/curtidas', FotoController.getCurtidas);

module.exports = routes;