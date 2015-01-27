module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        transparent = new Pixel(255, 255, 255, 1);

    generator.raster.forEach(function (pixel) {
        var overThreshold = false;
        pixel.channels().forEach(function (channel) {
            if (pixel[channel] >= 254 && channel !== "alpha") {
                overThreshold = true;
            }
        });
        if (overThreshold) {pixel.set(transparent); }
    });

};
