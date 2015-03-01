// A temporary service until the registration is complete and able to create the city.

angular.module("city").service("city.service.api", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var all = Restangular.all('city');

        this.create = function (scenarioName, cityName) {
            return all.post({scenario: scenarioName, name: cityName}).then(function (response) {
                console.log(response);
            });
        };
        this.list = all.getList;
        this.find = function (name) {
            // response.cities
            return Restangular.one('city', name).get();
        };
    }
]);
