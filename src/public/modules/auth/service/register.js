angular.module("auth").service("auth.service.register", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var signup = Restangular.all('signup');

        this.signup = function (params) {
            return signup.post(params).then(function (response) {
                console.log(response);
            });
        }
    }
]);
