const express = require('express');
const routes = express.Router();
const PerfilController = require('../controller/perfil.controller');

routes.route('/')
    .get(PerfilController.find);

module.exports = routes;