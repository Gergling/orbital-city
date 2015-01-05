angular.module("city").directive("cityIsometricGrid", [

    "$filter",

    function ($filter) {
        return {
            scope: {cellWidth: "@"},
            templateUrl: 'modules/city/partial/directive-isometric-grid.html',
            controller: [

                "$scope",

                function ($scope) {
                    var x, y, z, row, cell;

                    // This is where the array of squares is generated.
                    // The array needs to be in order of distance from the view point.
                    // Closest objects appear later in the array.
                    // Todo: Take tiles from a service.
                    $scope.cellHeight = $scope.cellWidth / 2;
                    $scope.tiles = [];
                    for (z = 0; z < 3; z += 1) {
                        for (x = 0; x < 3; x += 1) {
                            cell = {x: x, z: z};
                            cell.isoX = (x + z) / 2;
                            cell.isoY = (x + 1 - z) / 2;
                            $scope.tiles.push(cell);
                        }
                    }
                }
            ]
        };
    }
]);
