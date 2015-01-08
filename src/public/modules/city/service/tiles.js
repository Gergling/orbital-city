angular.module("city").service("city.service.tiles", [

    "$filter",
    "city.class.Tile",
    "city.service.view",

    function ($filter, Tile, view) {
        "use strict";

        var tiles = {
                facility: [ ], // All tiles with facilities
                construction: [ ], // All tiles eligible for new construction
                visible: [ ] // All tiles printed to the html
            },
            constructionMode = false,
            updateCallbacks = [ ],
            update = function () {
                if (constructionMode) {
                    // Algorithm for generating construction tiles
                } else {
                    tiles.construction = [ ];
                }
                // Update all visible tiles
                tiles.visible = $filter('filter')(tiles.facility, function (tile) {
                    var isVisible = true;
                    if (
                        tile.left() + tile.size().x() > view.size().x()
                            || tile.left() < 0
                            || tile.top() + tile.size().y() > view.size().y()
                            || tile.top() < 0
                    ) {
                        isVisible = false;
                    }
                    return isVisible;
                });
                updateCallbacks.forEach(function (fnc) {fnc(); });
            };

        (function () {
            var x, z, tile;
            for (z = 0; z < 3; z += 1) {
                for (x = 0; x < 3; x += 1) {
                    tile = new Tile();
                    tile.point().set(x, 0, z);
                    tiles.facility.push(tile);
                }
            }
        }());

        this.gridToggle = function () {
            // This function needs to run the update and set all the construction tiles to 'show'.
            //tiles.forEach(function
            console.log($filter('filter')(tiles.facility, function (tile) {
                console.log(tile);
                // return true to include this tile
            }));
            // Toggle tiles != current level - new facility mode
            // Toggle tiles above current level - full view mode
        };
        this.visible = function () {
            return $filter('orderBy')(tiles.visible, [
                "+y()",
                function (tile) {return tile.point().x() - tile.point().z(); }
            ]);
        };
        this.update = update;
        this.onChange = function (cb) {
            updateCallbacks.push(cb);
            update();
        };
    }
]);
