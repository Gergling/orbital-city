// A temporary service until the registration is complete and able to create the city.

angular.module("city").service("city.service.api", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var all = Restangular.all('city');

        this.create = function () {
            all.post({name: "Void Walker 2"}).then(function (response) {
                console.log(response);
            });
        };
        this.list = all.getList;
    }
]);
