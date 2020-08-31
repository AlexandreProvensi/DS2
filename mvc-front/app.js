var appDS2 = angular.module('appDS2', ['ngRoute']);

//Configuração das rotas
appDS2.config(function($routeProvider) {

    $routeProvider
        .when('/signin', {
            templateUrl: 'app/template/signin.html',
            controller: 'SignController'
        })

    .when('/signup', {
        templateUrl: 'app/template/signup.html',
        controller: 'SignController'
    })

    .when('/feed', {
        templateUrl: 'app/template/feed.html',
        controller: 'FeedController'
    })

    .otherwise({ redirectTo: '/signin' });

});