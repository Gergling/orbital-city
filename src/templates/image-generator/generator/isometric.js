module.exports = function (png, raster) {
    "use strict";

    var extend = require("deep-extend"),
        maths = require("./maths"),
        Pixel = require("./pixel");

    this.ellipse = function (x0, y0, radius, fnc) {
        var flags = { },
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
                    flags.front = function () {
                        // Calculate how far the pixel at x, y is from the normal.
                        // The normal is at a gradient of y = 2x. 
                        // There is no offset from y0.
                        var dx = x - x0,
                            dy = y - y0,
                            dGradient,
                            front = false;
                            //gradient = dy / dx,
                            // Where is dx in relation to the normal?
                            // Find the norma;

                        if (dx === 0) {
                            if (dy > 0) {front = true; }
                        } else {
                            dGradient = dy / dx;
                            if (dy > 0) {
                                //if (dGradient > 2) {front = true; }
                                //if (dGradient < 0) {front = true; }
                            } else if (dGradient > 0) {
                                //if (dGradient > 0) {front = true; }
                            }
                        }
                        return front;
                    };
                    // Move dx and dy to here from inside isCirclePixel.
                    if (isCirclePixel(x, y, directions[direction])) {
                        fnc(p, x, y, direction, flags);
                    }
                });
            },
            ret = { };

        Object.keys(directions).forEach(function (direction) {
            ret[direction] = function () {filterCirclePixels(direction); };
        });

        return ret;
    };

    this.cylinder = function (x0, y0, radius, length, fnc, args) {
        // Extend lines along the length of the cylinder.
        // Runs a circle routine, each pixel has gradient/pythagoran 
            // co-ordinates generated.

        var flags = { };
        args.circle = extend({
            scale: {
                x: 2 / 3
            }
        }, args.circle || { });

        return raster.circle(x0, y0, radius, function (p, x, y, angle, i) {
            var lineFnc = function (pixel, x, y, i) {
                    fnc(p, x, y, i);
                    pixel.set(p.copy());
                },
                //gradient = (direction === "ascending" ? -1 : 1),
                gradient = 1,
                x2 = x + (length * gradient),
                y2 = y - Math.floor(length / 2);

            p.random();
            raster.line(lineFnc, x, y, x2, y2);
            raster.line(lineFnc, x, y + 1, x2, y2 + 1);
        }, args.circle);

        return this.ellipse(x0, y0, radius, function (p, x, y, direction, flags) {
            var lineFnc = function (pixel, x, y, i) {
                    fnc(p, x, y, direction, i);
                    if (flags.front()) {
                        pixel.set(p.copy());
                    }
                },
                gradient = (direction === "ascending" ? -1 : 1),
                x2 = x + (length * gradient),
                y2 = y - Math.floor(length / 2);

            p.random();
            raster.line(lineFnc, x, y, x2, y2);
            raster.line(lineFnc, x, y + 1, x2, y2 + 1);
        });
    };
    /*this.cylinder = function (x0, y0, radius, length, fnc) {
        // Extend lines along the length of the cylinder.
        // Runs a circle routine, each pixel has gradient/pythagoran 
            // co-ordinates generated.

        var flags = { };

        return this.ellipse(x0, y0, radius, function (p, x, y, direction, flags) {
            //console.log(direction);
            var lineFnc = function (pixel, x, y, i) {
                    fnc(p, x, y, direction, i);
                    if (flags.front()) {
                        pixel.set(p.copy());
                    }
                },
                gradient = (direction === "ascending" ? -1 : 1),
                x2 = x + (length * gradient),
                y2 = y - Math.floor(length / 2);

            p.random();
            raster.line(lineFnc, x, y, x2, y2);
            raster.line(lineFnc, x, y + 1, x2, y2 + 1);
        });
    };*/
};
