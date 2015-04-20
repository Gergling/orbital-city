angular.module("auth").controller("auth.controller.login", [

    "$scope",
    "$location",
    "auth.service.login",
    "auth.service.auth",

    function ($scope, $location, login, auth) {
        "use strict";

        $scope.login = {
            username: "a@b.c",
            password: "abc"
        };

        // Checking if logged in
        auth.update().then(function (a) {
            if (a.authenticated()) {
                $location.path(login.redirect());
            }
        });

        $scope.submit = function () {
            login.submit({
                username: $scope.login.username,
                password: $scope.login.password
            }).then(function (response) {
                $location.path(login.redirect());
            });
        };
    }
]);
