angular.module("player").directive("playerCurrent", function () {

    "use strict";

    return {
        scope: { },
        templateUrl: "modules/player/partial/directive-current.html",
        controller: [

            "$scope",
            "player.service.current",

            function ($scope, player) {
                
            }
        ]
    };
});
