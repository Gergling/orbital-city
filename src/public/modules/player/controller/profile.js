angular.module("player").controller("player.controller.profile", [

    "$scope",
    "player.service.current",
    "player.service.profile",

    function ($scope, current, profile) {
        "use strict";

        var p = function (label, property) {
                return {
                    label: label,
                    property: property,
                    refresh: function () {
                        this.value = this.original;
                    }
                };
            },
            update = function () {
                $scope.profile.forEach(function (field) {
                    field.value = current[field.property]();
                    field.original = current[field.property]();
                });
            };

        $scope.profile = [
            p("Name", "name"),
            //p("Stuff", "stuff")
        ];

        update();
        current.fetch().then(update);

        $scope.save = function () {
            $scope.profile.forEach(function (field) {
                profile[field.property](field.value);
            });
            profile.save();
        };
    }
]);
