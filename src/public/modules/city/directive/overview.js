angular.module("city").directive("cityOverview", function () {
    "use strict";

    return {
        scope: { },
        templateUrl: "modules/city/partial/directive-overview.html",
        controller: [

            "$scope",
            "city.service.tiles",
            "city.service.view",

            function ($scope, tiles, view) {
                $scope.gridToggle = tiles.gridToggle;
                $scope.left = function () {view.camera().x(view.camera().x() - 1); };
                $scope.right = function () {view.camera().x(view.camera().x() + 1); };
                //tiles.update
            }
        ]
    };
});
