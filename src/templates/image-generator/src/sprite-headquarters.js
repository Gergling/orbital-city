module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        i,
        x,
        y,
        colours = {
            transparent: new Pixel(1, 1, 1, 1),
            black: new Pixel(1, 1, 1, 255)
        };

    // Top-left line
    for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = png.height / 2 - Math.floor(i / 2);
        generator.raster.forEach(function (pixel, px, py) {
            pixel.alpha = 1;
        }, x, 0, x, y - 1);
        generator.raster.pixel(x, y, colours.black);
    }

};
