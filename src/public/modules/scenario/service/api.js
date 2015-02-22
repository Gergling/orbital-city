angular.module("scenario").service("scenario.service.api", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var all = Restangular.all('city');

        this.list = all.getList;
    }
]);
