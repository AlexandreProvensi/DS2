const express = require('express');
const routes = new express.Router();

//Importa as rotas da aplicação
const cidadeRoute = require('../routes/cidade.route');
const pessoaRoute = require('../routes/pessoa.route');
const usuarioRoute = require('../routes/usuario.route');
const comentarioRoute = require('../routes/comentario.route');
const curtidaRoute = require('../routes/curtida.route');
const fotoRoute = require('../routes/foto.route');

routes.use('/cidades', cidadeRoute);
routes.use('/pessoas', pessoaRoute);
routes.use('/account', usuarioRoute);

routes.use('/fotos', fotoRote);

module.exports = routes;