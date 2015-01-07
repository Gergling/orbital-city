angular.module("city").directive("cityIsometricGrid", [

    function () {
        return {
            scope: {cellWidth: "@"},
            templateUrl: 'modules/city/partial/directive-isometric-grid.html',
            controller: [

                "$scope",
                "city.service.tiles",

                function ($scope, tiles) {
                    $scope.cellHeight = $scope.cellWidth / 2;
                    tiles.onChange(function () {$scope.tiles = tiles.visible(); });
                }
            ]
        };
    }
]);
