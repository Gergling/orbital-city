angular.module("player").directive("playerCurrent", function () {

    "use strict";

    return {
        scope: { },
        templateUrl: "modules/player/partial/directive-current.html",
        controller: [

            "$scope",
            "player.service.current",

            function ($scope, player) {
                var loading = false,
                    name = "(Unnamed)";

                player.callback(function (promise) {
                    loading = true;
                    promise.then(function (c) {
                        name = c.name() || "(Unnamed)";
                    }).finally(function () {
                        loading = false;
                    });
                });

                $scope.name = function () {return name; };
                $scope.loading = function () {return loading; };

                player.fetch();
            }
        ]
    };
});
