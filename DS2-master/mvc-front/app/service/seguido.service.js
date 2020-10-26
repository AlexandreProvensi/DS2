(function(app) {

    app.service('SeguidoService', function( $http ) {
        const urlSaaS = 'http://localhost:3000';

        function follow(username, usuario) {
            return $http.post(urlSaaS + '/'+ username +'/seguindo', usuario);
        }

        function listAll(username) {
            return $http.get(urlSaaS + '/'+ username +'/seguindo');
        }

        return {
            seguir: follow,
            listar: listAll
        }
        
    });

})( appDS2 );