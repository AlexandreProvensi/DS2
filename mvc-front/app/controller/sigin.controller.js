(function(app) {

    app.controller('SignController', function($scope, SignService) {

        //Inicia o objeto usuario
        $scope.usuario = {
            username: '',
            password: ''
        }

        //Faz a autenticação
        $scope.signin = function() {

            SignService.entrar($scope.usuario)
                .then(result => {
                    console.log('Deu certo', result);
                })
                .catch(error => {
                    console.log('Deu pau', error)
                });

        }


    });

})(appDS2);