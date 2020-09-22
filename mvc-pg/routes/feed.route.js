const express = require('express');
const routes = express.Router();
const FeedController = require('../controller/feed.controller');

routes.route('/')
    .get(FeedController.find);

module.exports = routes;