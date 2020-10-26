var appDS2 = angular.module('appDS2', ['ngRoute', 'ngStorage']);

//Configuração das rotas
appDS2.config(function ($routeProvider) {

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

        .when('/:profile', {
            templateUrl: 'app/template/profile.html',
            controller: 'ProfileController'
        })

        .otherwise({ redirectTo: '/signin'});

});

//Define que acontecerá na execução da aplicação
appDS2.run(function ($rootScope, $location, $sessionStorage) {

    $rootScope.$on('$locationChangeStart', function () {

        //Verifica se é para deslogar (signout)
        if ($location.path() == '/signout') {
            //Removo o logado da sessao
            $sessionStorage.$reset({
                logado: false
            });
            $location.path('/signin');
        }
        if ($location.path().indexOf('sign') < 0) {
            //Verifica se o usuário entrou
            if (!$sessionStorage.logado) {
                $location.path('/signin');
            }
        }
    });

});