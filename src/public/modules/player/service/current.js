angular.module("player").service("player.service.current", [

    "$q",
    "Restangular",

    function ($q, Restangular) {
        "use strict";

        var scope = this,
            player = Restangular.one('player'),
            userId,
            name,
            callbacks = [ ];

        this.userId = function () {return userId; };

        this.fetch = function (forceUpdate) {
            var deferred = $q.defer();

            scope.update(deferred.promise);

            if (userId && !forceUpdate) {
                deferred.resolve(scope);
            } else {
                player.get().then(function (response) {
                    name = response.name;
                    userId = response.userId;
                    deferred.resolve(scope);
                });
            }

            return deferred.promise;
        };

        this.callback = function (cb) {callbacks.push(cb); };
        this.update = function (promise) {
            callbacks.forEach(function (cb) {
                cb(promise);
            });
        };
        this.name = function (value) {
            if (value) {name = value; }
            return name;
        };

        this.fetch();
    }
]);
