angular.module("city").directive("cityTile", [

    function () {
        "use strict";

        return {
            scope: {cityTile: "="},
            templateUrl: 'modules/city/partial/directive-isometric-tile.html',
            controller: [

                "$scope",
                "city.class.Tile",

                function ($scope, Tile) {
                    var tile = $scope.cityTile;

                    if (!($scope.cityTile instanceof Tile)) {throw new Error("cityTile directive: attribute value must be an instance of city.class.Tile."); }

                    // Todo: Background empty tile image.
                    $scope.image = "modules/city/media/image/isometric-tile/corridor-ascending-100x100.png";
                }
            ]
        };
    }
]);
