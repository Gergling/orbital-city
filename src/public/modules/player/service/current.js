angular.module("player").service("player.service.current", [

    "restangular",

    function (Restangular) {
        "use strict";

        var scope = this;

        Restangular.all('player').get().then(function (response) {
            console.log(response);
        });
    }
]);
