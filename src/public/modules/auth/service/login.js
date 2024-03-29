angular.module("auth").service("auth.service.login", [

    "$q",
    "Restangular",
    "auth.service.auth",

    function ($q, Restangular, auth) {
        "use strict";

        var login = Restangular.all('login'),
            redirect = '/';

        this.redirect = function (value) {
            if (value) {redirect = value; }
            return redirect;
        };

        this.submit = function (params) {
            return $q.all([
                login.post(params),
                auth.update()
            ]);
        }
    }
]);
