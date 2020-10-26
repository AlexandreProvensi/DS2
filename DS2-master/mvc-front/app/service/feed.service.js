(function(app) {

    app.service('FeedService', function( $http ) {
        const urlSaaS = 'http://localhost:3000';

        function listAll(username) {
            return $http.get(urlSaaS + '/'+ username +'/feed');
        }

        return {
            listar: listAll
        }
        
    });

})( appDS2 );