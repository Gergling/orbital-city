angular.module("technopedia").controller("technopedia.controller.index", [

    "$scope",
    "application.constant.routes",

    function ($scope, root) {
        "use strict";

        if (root.activeDescendant().name() !== 'technopedia') {
            $scope.technopediaPartial = root.activeDescendant().partial();
        }
    }
]);
