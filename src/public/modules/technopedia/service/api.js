angular.module("technopedia").service("technopedia.service.api", [

    "Restangular",

    function (Restangular) {
        "use strict";

        var facilities;

        this.facilities = function (refresh) {
            if (refresh || !facilities) {
                facilities = Restangular.all('facilities').getList();
            }
            return facilities;
        };
    }
]);
