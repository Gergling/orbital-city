angular.module("scenario").controller("scenario.controller.list", [

    "$scope",
    "scenario.service.api",
    "city.service.api",

    function ($scope, scenarioApi, cityApi) {
        "use strict";

        var detail,
            promise;

        $scope.list = [ 'stuff' ];

        scenarioApi.list().then(function (response) {
            $scope.list = response;
        });

        $scope.detail = function (scenario) {
            if (typeof scenario !== "undefined") {
                detail = scenario;
            }
            return detail;
        };

        $scope.cityName = '';
        $scope.enabled = false;
        $scope.duplicate = false;
        $scope.checking = false;
        $scope.error = false;
        $scope.queue = false;
        $scope.validate = function () {
            if ($scope.cityName) {
                // If it's already checking, don't check until it's finished
                if (!$scope.checking) {
                    $scope.checking = true;
                    promise = cityApi.find($scope.cityName);
                    promise.then(function (response) {
                        $scope.error = false;
                        if (response.cities.length) {
                            $scope.duplicate = true;
                            $scope.enabled = false;
                        } else {
                            $scope.duplicate = false;
                            $scope.enabled = true;
                        }
                    });
                    promise.catch(function (response) {
                        $scope.error = response;
                    });
                    promise.finally(function () {
                        $scope.checking = false;
                        if ($scope.queue) {
                            $scope.validate();
                            $scope.queue = false;
                        }
                    });
                } else {
                    // Queue another check when this one is done.
                    $scope.queue = true;
                }
            } else {
                $scope.duplicate = false;
                $scope.enabled = false;
            }
        };
        $scope.invest = function () {
            // Use detail.name and the API to start a city.
            // Disabled while checking for duplicate, enable when confirmed ok
            cityApi.create(detail.name, $scope.cityName).then(function () {
                // Redirect
            }).catch(function () {
                // Report en error
            }).finally(function () {
                
            });
        };
    }
]);
