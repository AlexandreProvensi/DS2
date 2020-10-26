(function(app) {

    app.service('SignService', function( $http ) {
        const urlSaaS = 'http://localhost:3000/account';

        function signin( credential ) {

            return $http.post(urlSaaS + '/signin', credential);

        }

        function signup(newuser) {
            return $http.post(urlSaaS + '/signup', newuser);
        }

        function exists(username) {
            return $http.post(urlSaaS + '/exists/'+ username);
        }

        return {
            entrar: signin,
            cadastrar: signup,
            existe: exists
        }
        
    });

})( appDS2 );