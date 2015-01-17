module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        maths = require("../generator/maths"),
        i,
        x,
        y,
        pixel = new Pixel(255, 1, 1, 1),
        circlePixel = function (x0, y0, radius, x, y) {
            var circle = false,
                dx = x - x0,
                dy = y - y0;

            //if (Math.floor(maths.pythagoras(dx, (dy + (dx / 2)))) === radius) { //ascending
            //if (Math.floor(maths.pythagoras(dx, (dy - (dx / 2)))) === radius) { //descending
            var dev = maths.pythagoras(dx, dy * 2);
            if (dev > radius - 1 && dev < radius) {
                circle = true;
            }
            return circle;
        };

    png.width = 100;
    png.height = 50;

    // Transparent background
    generator.raster.forEach(function (p, x, y) {
        p.grey(255);
        if (circlePixel(40, 20, 15, x, y)) {
            //p.green = 0;
        }
        // Filter out the pixels in the circle locations,
        // skewing by ascending gradient.
    });
    //generator.raster.pixel(40, 20, new Pixel(1,1,1,255));

    var ellipse = generator.isometric.ellipse(40, 20, 15, function (p, x, y) {
        p.green = 0;
    });
    ellipse.ascending();
    //generator.raster.circle(40, 20, 15, function (p) {
        //p.red = 0;
    //});
    /*generator.raster.circle(40, 20, 15, function (p, dx, dy) {
        //var pixel = generator.raster.pixel(dx, dy);
        p.green = 0;
        p.blue = 0;
        //generator.raster.pixel(dx, dy, pixel);

        //p.red = 0;
    });*/

};
