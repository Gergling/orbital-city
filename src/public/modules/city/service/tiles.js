angular.module("city").service("city.service.tiles", [

    "$filter",
    "city.class.Tile",

    function ($filter, Tile) {
        "use strict";

        // Todo: Manage tiles.
        // When tiles are added, they should be sorted by y, then by x-z.
        // May be best done with $filter.
        this.get = function () {
            var tiles = [ ], x, y, z, row, cell;

            for (z = 0; z < 3; z += 1) {
                for (x = 0; x < 3; x += 1) {
                    /*
                    cell = {x: x, z: z};
                    cell.isoX = (x + z);
                    cell.isoY = (x + 1 - z);
                    tiles.push(cell);
                    /*/
                    tiles.push(new Tile(x, 0, z));
                    //*/
                }
            }
            return $filter('orderBy')(tiles, ["+y()", function (tile) {return tile.x() - tile.z(); }]);
        };
    }
]);
