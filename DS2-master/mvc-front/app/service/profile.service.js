(function(app) {

    app.service('ProfileService', function( $http ) {
        const urlSaaS = 'http://localhost:3000';

        function profile(username) {
            return $http.get(urlSaaS + '/'+ username +'/perfil');
        }

        function photos(username) {
            return $http.get(urlSaaS + '/'+ username +'/fotos');
        }

        return {
            perfil: profile,
            fotos: photos
        }
        
    });

})( appDS2 );