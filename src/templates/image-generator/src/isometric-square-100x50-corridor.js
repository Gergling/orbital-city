module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        maths = require("../generator/maths"),
        i,
        x,
        y,
        pixel = new Pixel(255, 1, 1, 1);

    png.width = 100;
    png.height = 100;

    // Transparent background
    generator.raster.forEach(function (p, x, y) {
        p.grey(255);
    });

    generator.isometric.cylinder(20, 20, 15, 20, function (p, x, y) {
        // Red - Partial circle I want
        p.green = 0;
        p.blue = 0;
    }, {
        circle: {
            radial: {
                start: Math.PI + (Math.PI / 8),
                arc: Math.PI + (Math.PI * 5 / 12)
            }
        }
    });
    generator.isometric.cylinder(70, 20, 15, 20, function (p, x, y) {
        // Green - full circle
        p.red = 0;
        p.blue = 0;
    });
    generator.isometric.cylinder(20, 70, 15, 20, function (p, x, y) {
        // Purple - full circle
        p.green = 0;
    }, {
        circle: {
            radial: {
                start: Math.PI
            }
        }
    });
    generator.isometric.cylinder(70, 70, 15, 20, function (p, x, y) {
        // Blue - half circle
        p.red = 0;
        p.green = 0;
    }, {
        circle: {
            radial: {
                arc: Math.PI
            }
        }
    });

};
