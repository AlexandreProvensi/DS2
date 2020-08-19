const express = require('express');
const routes = new express.Router();
const UsuarioController = require('../controller/usuario.controller');

routes.post('/signup', UsuarioController.signup);
routes.post('/signin', UsuarioController.signin);
routes.post('/exists/:username', UsuarioController.usernameExists);

module.exports = routes;