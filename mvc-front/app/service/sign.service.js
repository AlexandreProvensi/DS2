(function(app) {

    app.service('SignService', function($http) {
        const urlSaaS = 'http://localhost:3000/account';

        function signin(credential) {

            return $http.post(urlSaaS + '/signin', credential);

        }

        function signup(newuser) {
            return $http.post(urlSaaS + '/signup', newuser);
        }

        return {
            entrar: signin,
            cadastrar: signup
        }

    });

})(appDS2);