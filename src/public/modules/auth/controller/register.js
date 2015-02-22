angular.module("auth").controller("auth.controller.register", [

    "$scope",
    "$location",
    "auth.service.register",

    function ($scope, $location, register) {
        "use strict";

        $scope.options = {
            from:   0,
            to:     1,
            step:   0.05,
            round: 2,
            css: {
                background: {"background-color": "silver"},
                before: {"background-color": "purple"},
                default: {"background-color": "white"},
                after: {"background-color": "green"},
                pointer: {"background-color": "red"}          
            }
        };

        $scope.genders = [
            { label: "Female", value: 0 },
            { label: "Male", value: 0 },
            { label: "Blue", value: 0 },
            { label: "Sideways", value: 0 },
            { label: "Peppermint", value: 0 }
        ];

        $scope.signup = {
            email: "a@b.c",
            password: "abc"
        };

        $scope.submit = function () {
            register.signup({
                username: $scope.signup.email,
                password: $scope.signup.password,
                email: $scope.signup.email,
                firstName: "first",
                lastName: "last"
            }).then(function () {
                $location.path("/login/");
            });
        };
    }
]);
