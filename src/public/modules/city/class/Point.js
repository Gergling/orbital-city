angular.module("city").factory("city.class.Point", [

    // Resources

    function () {
        "use strict";

        return function (x, y, z) {
            x = x || 0;
            y = y || 0;
            z = z || 0;
            this.set = function (a, b, c) {
                x = a;
                y = b;
                z = c;
            };
            this.x = function (value) {
                if (value === 0 || value) {x = value; }
                return x;
            };
            this.y = function (value) {
                if (value === 0 || value) {y = value; }
                return y;
            };
            this.z = function (value) {
                if (value === 0 || value) {z = value; }
                return z;
            };
            this.add = function (a, b, c) {
                if (typeof a === "number") {
                    // Assume this is a change to the co-ordinates.
                    x += a || 0;
                    y += b || 0;
                    z += c || 0;
                }
            };
        };
    }
]);
