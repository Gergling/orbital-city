angular.module("auth").service("auth.service.login", [

    "$q",
    "Restangular",
    "auth.service.auth",

    function ($q, Restangular, auth) {
        "use strict";

        var login = Restangular.all('login');

        this.submit = function (params) {
            return $q.all([
                login.post(params),
                auth.update()
            ]);
        }
    }
]);
