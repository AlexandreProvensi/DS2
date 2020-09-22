(function(app) {

    app.controller('FeedController', function($scope, $sessionStorage, PessoaService,
        SeguidoService, FeedService) {
        //Pega o usuário logado
        $scope.logado = $sessionStorage.logado;

        $scope.pessoas = [];

        $scope.seguindo = [];

        $scope.feeds = [];

        function pessoaSeguida(pessoa) {
            for (usuario of $scope.seguindo) {
                if (usuario.id == pessoa.id) {
                    return true;
                }
            }

            return false;
        }

        $scope.seguir = (pessoa) => {
            SeguidoService.seguir($scope.logado.username, pessoa.usuario)
                .then(result => {
                    pessoa.seguido = true;
                })
        }

        FeedService.listar($scope.logado.username)
            .then(result => {
                $scope.feeds = result.data;
            })

        PessoaService.listar()
            .then(resultPessoa => {

                SeguidoService.listar($scope.logado.username)
                    .then(resultSeguindo => {
                        $scope.seguindo = resultSeguindo.data;

                        for (pessoa of resultPessoa.data) {
                            pessoa.seguido = pessoaSeguida(pessoa);

                            if (pessoa.usuario.id != $scope.logado.id) {
                                $scope.pessoas.push(pessoa);
                            }
                        }
                    });
            });
    });

})(appDS2);