const express = require('express');
const routes = express.Router();
const SeguidoController = require('../controller/seguido.controller');

routes.route('/')
    .get(SeguidoController.find)
    .post(SeguidoController.create);

module.exports = routes;