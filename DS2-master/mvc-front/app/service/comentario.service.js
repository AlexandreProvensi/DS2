(function(app) {

    app.service('ComentarioService', function( $http ) {
        const urlSaaS = 'http://localhost:3000';

        function getComentarios(username, foto) {
            return $http.get(urlSaaS + '/'+ username +'/fotos/'+ foto.id +'/comentarios');
        }

        return {
            comentarios: getComentarios
        }
        
    });

})( appDS2 );