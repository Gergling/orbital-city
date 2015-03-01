angular.module("scenario").service("scenario.service.api", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var all = Restangular.all('scenario');

        this.list = all.getList;

        this.create = function (scenarioName, cityName) {
            return all.post({
                scenarioName: scenarioName,
                cityName: cityName
            });
        };
    }
]);
