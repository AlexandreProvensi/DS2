(function(app) {

    app.service('PessoaService', function( $http ) {
        const urlSaaS = 'http://localhost:3000';

        function listAll() {
            return $http.get(urlSaaS + '/pessoas');
        }

        return {
            listar: listAll
        }
        
    });

})( appDS2 );