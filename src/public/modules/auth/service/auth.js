angular.module("auth").service("auth.service.auth", [

    "$q",
    "Restangular",

    function ($q, Restangular) {
        "use strict";

        var scope = this,
            player = Restangular.one('login'),
            authenticated = false;

        this.update = function () {
            var deferred = $q.defer();

            player.get().then(function (response) {
                authenticated = Object.keys(response).length > 0;
                deferred.resolve(scope);
            });

            return deferred.promise;
        };

        this.authenticated = function () {return authenticated; };
    }
]);
