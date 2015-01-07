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
                var update = function () {
                    tiles.update();
                    
                };
                $scope.gridToggle = tiles.gridToggle;
                $scope.left = function () {
                    view.camera().x(view.camera().x() - 1);
                    update();
                };
                $scope.right = function () {
                    view.camera().x(view.camera().x() + 1);
                    update();
                };
            }
        ]
    };
});
