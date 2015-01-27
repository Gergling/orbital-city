module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        i,
        x,
        y,
        pixel;

    png.width = 20;
    png.height = 10;

    // Transparent background
    generator.raster.forEach(function (pixel, x, y) {
        pixel.alpha = 1;
    });

    // Top-left line
    pixel = new Pixel(127, 127, 127, 255);
    /*for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = png.height / 2 - Math.floor(i / 2);
        generator.raster.pixel(x, y, pixel);
    }*/
    generator.raster.line(function (p) {
        p.set(pixel);
    }, 0, png.height / 2, png.width / 2, 0);

    // Bottom-left line
    pixel = new Pixel(63, 63, 63, 255);
    for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = png.height / 2 + Math.floor(i / 2);
        generator.raster.pixel(x, y, pixel);
    }

    // Top-right line
    pixel = new Pixel(95, 95, 95, 255);
    for (i = 0; i < png.width / 2; i += 1) {
        x = i + png.width / 2;
        y = Math.floor(i / 2);
        generator.raster.pixel(x, y, pixel);
    }

    // Bottom-right line
    pixel = new Pixel(31, 31, 31, 255);
    /*for (i = 2; i < png.width / 2; i += 1) {
        x = i + png.width / 2 - 2;
        y = png.height - Math.floor(i / 2) - 1;
        generator.raster.pixel(x, y, pixel);
    }*/
    generator.raster.line(function (p) {
        p.set(pixel);
    }, png.width / 2, png.height, png.width, png.height / 2);

};
