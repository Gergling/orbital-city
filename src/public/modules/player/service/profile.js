angular.module("player").service("player.service.profile", [

    "$q",
    "Restangular",
    "player.service.current",

    function ($q, Restangular, current) {
        "use strict";

        var scope = this,
            player = Restangular.one('player'),
            data = { };

        this.name = function (value) {
            if (value) {data.name = value; }
            return data.name;
        };

        this.save = function () {
            var deferred = $q.defer();

            // Format needs to be /player/:id/
            // First argument is supposed to be an id.
            // Need to read up on how rest works.
            current.fetch().then(function (c) {
                player.post(c.userId(), data).then(function (response) {
                    scope.name(response.name);
                    current.name(response.name);
                    current.update(deferred.promise);
                    // Update current service
                    deferred.resolve(scope);                
                });
            });

            return deferred.promise;
        };
    }
]);
