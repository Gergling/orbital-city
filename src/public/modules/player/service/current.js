angular.module("player").service("player.service.current", [

    "$q",
    "Restangular",

    function ($q, Restangular) {
        "use strict";

        var scope = this,
            player = Restangular.one('player'),
            userId;

        this.userId = function () {return userId; };

        this.fetch = function (forceUpdate) {
            var deferred = $q.defer();

            if (userId && !forceUpdate) {
                deferred.resolve(scope);
            } else {
                console.log(this);
                player.get().then(function (response) {
                    scope.name = response.name;
                    userId = response.userId;
                    deferred.resolve(scope);
                    console.log(scope);
                });
            }

            return deferred.promise;
        };

        this.fetch();
    }
]);
