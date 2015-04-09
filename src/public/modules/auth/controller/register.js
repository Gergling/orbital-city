angular.module("auth").controller("auth.controller.register", [

    "$scope",
    "$location",
    "auth.service.register",

    function ($scope, $location, register) {
        "use strict";

        $scope.genders = [ ];
        [
            { label: "Female", value: 0 },
            { label: "Male", value: 0 },
            { label: "Blue", value: 0.5 },
            { label: "Sideways", value: 0 },
            { label: "Peppermint", value: 0 }
        ].forEach(function (gender) {
            gender.slider = gender.value * 50;
            $scope.genders.push(gender);
        });

        $scope.$watch("genders", function () {
            $scope.genders.forEach(function (gender) {
                gender.value = gender.slider / 50;
            });
        }, true);

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
