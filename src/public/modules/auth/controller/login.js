angular.module("auth").controller("auth.controller.login", [

    "$scope",
    "$location",
    "auth.service.login",

    function ($scope, $location, login) {
        "use strict";

        $scope.login = {
            username: "a@b.c",
            password: "abc"
        };

        $scope.submit = function () {
            login.submit({
                username: $scope.login.username,
                password: $scope.login.password,
            }).then(function (response) {
                $location.path('/');
            });
        };
    }
]);
