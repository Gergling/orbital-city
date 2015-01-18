module.exports = function (png, raster) {
    "use strict";

    var maths = require("./maths"),
        Pixel = require("./pixel");

    this.ellipse = function (x0, y0, radius, fnc) {
        var //circle = false,
            isCirclePixel = function (x, y, positive) {
                var affirm = false,
                    dx = x - x0,
                    dy = y - y0;

                if (Math.floor(maths.pythagoras(dx, (dy + (dx * positive / 2)))) === radius) {
                    affirm = true;
                }
                return affirm;
            },
            directions = {
                "ascending" : 1,
                "descending" : -1,
            },
            filterCirclePixels = function (direction) {
                raster.forEach(function (p, x, y) {
                    //circle = false;
                    if (isCirclePixel(x, y, directions[direction])) {fnc(p, x, y, direction);}
                });
            },
            ret = { };

        Object.keys(directions).forEach(function (direction) {
            ret[direction] = function () {filterCirclePixels(direction); };
        });

        return ret;
    };

    this.cylinder = function (x0, y0, radius, length, fnc) {
        // Extend lines along the length of the cylinder.
        // Runs a circle routine, each pixel has gradient/pythagoran 
            // co-ordinates generated.

        var flags = { };

        return this.ellipse(x0, y0, radius, function (p, x, y, direction) {
            //console.log(direction);
            var lineFnc = function (pixel, x, y, i) {
                    //fnc(p, x, y, direction, i);
                    pixel.set(p.copy());
                },
                gradient = (direction === "ascending" ? -1 : 1),
                x2 = x + (length * gradient),
                y2 = y - Math.floor(length / 2);

            p.random();
            raster.line(lineFnc, x, y, x2, y2);
            raster.line(lineFnc, x, y + 1, x2, y2 + 1);
        });
    };
};
