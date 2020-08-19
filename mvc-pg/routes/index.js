const express = require('express');
const routes = new express.Router();

//Importa as rotas da aplicação
const cidadeRoute = require('../routes/cidade.route');
const pessoaRoute = require('../routes/pessoa.route');
const usuarioRoute = require('../routes/usuario.route');

routes.use('/cidades', cidadeRoute);
routes.use('/pessoas', pessoaRoute);
routes.use('/account', usuarioRoute);

module.exports = routes;