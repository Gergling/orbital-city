module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        i,
        j,
        x,
        y,
        colours = {
            main: new Pixel(170, 150, 127, 255),
            light: new Pixel(190, 170, 127, 255),
            dark: new Pixel(127, 100, 80, 255)
        },
        tileHeight = 10,
        totalTilesHeight;

    png.width = 100;
    png.height = 50;

    totalTilesHeight = png.height / tileHeight;

    // Transparent background
    generator.raster.forEach(function (pixel, x, y) {
        pixel.set(colours.main);
        //pixel.alpha = 0;
    });

    // Top-left line
    //colours.light = new Pixel(127, 127, 127, 255);
    /*for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = png.height / 2 - Math.floor(i / 2);
        //generator.raster.pixel(x, y, pixel);
    }*/

    // Decide on a size of floor tiles, which will be stored in a variable.
    // Using this size, loop through every possible line that intersects the image dimensions.

    // Incline
    for (j = 1; j < totalTilesHeight * 2; j += 1) {
        for (i = 0; i < png.width; i += 1) {
            x = i;
            y = j * tileHeight - Math.floor(i / 2);
            generator.raster.pixel(x, y - 1, colours.dark);
            generator.raster.pixel(x, y, colours.light);
        }
    }

    // Decline
    for (j = 1; j < totalTilesHeight * 2; j += 1) {
        for (i = 0; i < png.width; i += 1) {
            x = i;
            y = Math.floor(i / 2) - (j * tileHeight) + png.height;
            generator.raster.pixel(x, y - 1, colours.dark);
            generator.raster.pixel(x, y, colours.light);
        }
    }
};
