angular.module("city").controller("city.controller.index", [

    "$scope",
    "$location",
    "city.service.api",

    function ($scope, $location, api) {
        "use strict";

        $scope.create = api.create;

        $scope.cities = [ ];
        api.list().then(function (response) {
            $scope.cities = response;
            if (response.length === 0) {
                $location.path('/scenario')
            }
        });
    }
]);
