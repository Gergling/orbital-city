angular.module("city").factory("city.class.Tile", [

    // Resources

    function () {
        "use strict";

        return function (x, y, z) {
            var width = 100,
                height = 50,
                left = (x + z) * width / 2,
                top = (x + 1 - z - y) * height / 2;

            this.left = function () {return left; };
            this.top = function () {return top; };
            this.width = function () {return width; };
            this.height = function () {return height; };
            this.x = function () {return x; };
            this.y = function () {return y; };
            this.z = function () {return z; };
        };
    }
]);
