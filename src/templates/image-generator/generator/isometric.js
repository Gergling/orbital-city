module.exports = function (png, raster) {
    "use strict";

    var maths = require("./maths"),
        Pixel = require("./pixel");

    this.ellipse = function (x0, y0, radius, fnc) {
        var circle = false,
            isCirclePixel = {
                ascending: function (x, y) {
                    var dx = x - x0,
                        dy = y - y0;

                    if (Math.floor(maths.pythagoras(dx, (dy + (dx / 2)))) === radius) {
                        circle = true;
                    }
                    return circle;
                },
                descending: function (x, y) {
                    var dx = x - x0,
                        dy = y - y0;

                    if (Math.floor(maths.pythagoras(dx, (dy - (dx / 2)))) === radius) {
                        circle = true;
                    }
                    return circle;
                }
            },
            filterCirclePixels = function (direction) {
                raster.forEach(function (p, x, y) {
                    circle = false;
                    if (isCirclePixel[direction](x, y)) {fnc(p, x, y, direction);}
                });
            };

        //if (Math.floor(maths.pythagoras(dx, (dy + (dx / 2)))) === radius) { //ascending
        //if (Math.floor(maths.pythagoras(dx, (dy - (dx / 2)))) === radius) { //descending
            //console.log(x, y, dx + dy);
            //circle = true;
        //}
        //return circle;
        return {
            ascending: function () {filterCirclePixels("ascending"); },
            descending: function () {filterCirclePixels("descending"); }
        };
    };

    this.cylinder = function (x0, y0, radius, length, fnc) {
        // Extend lines along the length of the cylinder.
        // Runs a circle routine, each pixel has gradient/pythagoran 
            // co-ordinates generated.
        return this.ellipse(x0, y0, radius, function (p, x, y) {
            
        });
    };
};