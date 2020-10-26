(function(app) {

    app.service('CurtidaService', function( $http ) {
        const urlSaaS = 'http://localhost:3000';

        function getCurtidas(username, foto) {
            return $http.get(urlSaaS + '/'+ username +'/fotos/'+ foto.id +'/curtidas');
        }

        return {
            curtidas: getCurtidas
        }
        
    });

})( appDS2 );