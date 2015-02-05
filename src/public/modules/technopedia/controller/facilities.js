angular.module("technopedia").controller("technopedia.controller.facilities", [

    "$scope",
    "technopedia.service.api",

    function ($scope, api) {
        "use strict";

        api.facilities().then(function (facilities) {
            $scope.facilities = facilities;
        });

        $scope.activate = function (facility) {
            // Route it.
            // This will redirect, the route will pick the facility.
            $scope.selected = facility;
        };
    }
]);
