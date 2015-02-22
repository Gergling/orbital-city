angular.module("auth").service("auth.service.login", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var login = Restangular.all('login');

        this.submit = function (params) {
            return login.post(params).then(function (response) {
                console.log(response);
            });
        }
    }
]);
