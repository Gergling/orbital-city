angular.module("city").directive("cityIsometricGrid", [

    function () {
        "use strict";

        return {
            scope: {cellWidth: "@"},
            templateUrl: 'modules/city/partial/directive-isometric-grid.html',
            controller: [

                "$scope",
                "city.class.Point",
                "city.service.tiles",
                "city.service.view",

                function ($scope, Point, tiles, view) {
                    var Drag = function () {
                            var enabled = false,
                                offset = new Point();

                            this.enabled = function (value) {
                                if (value || value === false) {enabled = value; }
                                return enabled;
                            };
                            this.offset = function ($event) {
                                if (this.enabled()) {
                                    view.camera().x($event.clientX - offset.x());
                                    view.camera().y($event.clientY - offset.y());
                                } else {
                                    offset.x($event.clientX);
                                    offset.y($event.clientY);
                                }
                            };
                        },
                        drag = new Drag();

                    $scope.cellHeight = $scope.cellWidth / 2;
                    tiles.onChange(function () {$scope.tiles = tiles.visible(); });
                    $scope.select = function (tile) {
                        // Tile is selected, but what for?
                    };
                    $scope.mousedown = function ($event) {
                        drag.offset($event);
                        drag.enabled(true);
                    };
                    $scope.mouseup = function ($event) {
                        drag.enabled(false);
                    };
                    $scope.mousemove = function ($event) {
                        drag.offset($event);
                    };
                    
                    // Need a click/drag
                    // This will provide an offset
                }
            ]
        };
    }
]);
