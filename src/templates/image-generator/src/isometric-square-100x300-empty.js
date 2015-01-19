module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        i,
        x,
        y,
        pixel;

    png.width = 100;
    png.height = 300;

    // Transparent background
    generator.raster.forEach(function (pixel, x, y) {
        pixel.alpha = 1;
    });

    // Top-left line
    pixel = new Pixel(127, 127, 127, 255);
    for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = png.height - (png.width / 4) - Math.floor(i / 2);
        generator.raster.pixel(x, y, pixel);
    }

    // Bottom-left line
    pixel = new Pixel(63, 63, 63, 255);
    for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = png.height - (png.width / 4) + Math.floor(i / 2);
        generator.raster.pixel(x, y, pixel);
    }

    // Top-right line
    pixel = new Pixel(95, 95, 95, 255);
    for (i = 0; i < png.width / 2; i += 1) {
        x = i + png.width / 2;
        y = png.height - (png.width / 2) + Math.floor(i / 2);
        generator.raster.pixel(x, y, pixel);
    }

    // Bottom-right line
    pixel = new Pixel(31, 31, 31, 255);
    for (i = 2; i < png.width / 2; i += 1) {
        x = i + png.width / 2 - 2;
        y = png.height - Math.floor(i / 2) - 1;
        generator.raster.pixel(x, y, pixel);
    }
};
