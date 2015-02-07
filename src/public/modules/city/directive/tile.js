angular.module("city").directive("cityTile", [

    "$timeout",

    function ($timeout) {
        "use strict";

        return {
            scope: {cityTile: "="},
            templateUrl: 'modules/city/partial/directive-isometric-tile.html',
            compile: function () {
                return {
                    post: function ($scope, $element) {
                        var img = $element.find('img');
                        img.bind('load', function (x) {
                            $element.find('.overlay').height(img.height());
                            $element.find('.overlay').css({top: 'initial'});
                        });
                    }
                };
            },
            controller: [

                "$scope",
                "city.class.Tile",

                function ($scope, Tile) {
                    var tile = $scope.cityTile;

                    if (!($scope.cityTile instanceof Tile)) {throw new Error("cityTile directive: attribute value must be an instance of city.class.Tile."); }

                    $scope.image = "modules/city/media/image/isometric-tile/corridor-ascending-100x100.png";
                }
            ]
        };
    }
]);
