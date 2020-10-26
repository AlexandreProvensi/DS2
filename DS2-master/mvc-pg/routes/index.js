const express = require('express');
const routes = new express.Router();

//Importa as rotas da aplicação
const cidadeRoute = require('./cidade.route');
const pessoaRoute = require('./pessoa.route');
const usuarioRoute = require('./usuario.route');

const fotoRoute = require('./foto.route');
const curtidaRoute = require('./curtida.route');
const comentarioRoute = require('./comentario.route');
const perfilRoute = require('./perfil.route');
const feedRoute = require('./feed.route');
const seguidoRoute = require('./seguido.route');

routes.param('username', (req, res, next, username) => {
    //Capturando o username da requisição e adicionando ao Request
    req.username = username;

    //Continuar a requisição
    next();
});


routes.use('/cidades', cidadeRoute);
routes.use('/pessoas', pessoaRoute);
routes.use('/account', usuarioRoute);

routes.use('/curtidas', curtidaRoute);
routes.use('/comentarios', comentarioRoute);

routes.use('/:username/fotos', fotoRoute);
routes.use('/:username/perfil', perfilRoute);

routes.use('/:username/feed', feedRoute);
routes.use('/:username/seguindo', seguidoRoute);


module.exports = routes;