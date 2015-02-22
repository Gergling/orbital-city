angular.module("scenario").controller("scenario.controller.list", [

    "$scope",
    "scenario.service.api",

    function ($scope, api) {
        "use strict";

        $scope.list = [ 'stuff' ];

        api.list().then(function (response) {
            $scope.list = response;
        });
    }
]);
