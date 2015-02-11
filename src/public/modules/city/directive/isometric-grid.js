angular.module("city").directive("cityIsometricGrid", [

    function () {
        "use strict";

        return {
            scope: {cellWidth: "@"},
            templateUrl: 'modules/city/partial/directive-isometric-grid.html',
            controller: [

                "$scope",
                "$element",
                "$window",
                "city.class.Point",
                "city.service.tiles",
                "city.service.view",

                function ($scope, $element, $window, Point, tiles, view) {
                    var Drag = function () {
                            var enabled = false,
                                offset = new Point();

                            this.start = function ($event) {
                                offset.x($event.clientX);
                                offset.y($event.clientY);
                                enabled = true;
                            };
                            this.stop = function () {
                                enabled = false;
                            };
                            this.update = function ($event) {
                                if (enabled) {
                                    view.camera().add($event.clientX - offset.x(), $event.clientY - offset.y());
                                    offset.x($event.clientX);
                                    offset.y($event.clientY);
                                    tiles.update();
                                }
                            };
                        },
                        drag = new Drag();

                    $scope.cellHeight = $scope.cellWidth / 2;
                    tiles.onChange(function () {$scope.tiles = tiles.visible(); });
                    $scope.select = function (tile) {
                        // Todo: Calculate exactly where the tile shape is, presumably using magic
                    };
                    $scope.mousedown = function ($event) {
                        drag.start($event);
                    };
                    $scope.mouseup = function () {
                        drag.stop();
                    };
                    $scope.mousemove = function ($event) {
                        var el = $element.find('.isometric-grid'),
                            x = $event.clientX - el.offset().left + $window.scrollX,
                            y = $event.clientY - el.offset().top + $window.scrollY;

                        drag.update($event);

                        $scope.tiles.forEach(function (tile) {
                            tile.hover(false);
                            if (tile.boundsCheck(x - tile.left(), y - tile.top())) {
                                tile.hover(true);
                            }
                        });
                    };
                }
            ]
        };
    }
]);
