module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        i,
        x,
        y,
        colours = {
            empty: new Pixel(),
            transparent: new Pixel(1, 1, 1, 1),
            black: new Pixel(1, 1, 1, 255),
            lightgrey: new Pixel(190, 190, 190),
            darkgrey: new Pixel(127, 127, 127)
        },
        computerBank = {
            top: {
                height: 10,
                center: {
                    height: 7
                }
            },
            panels: {
                height: 30,
                center: {
                    left: png.width / 2,
                    right: png.width / 2
                },
                left: {
                    colour: colours.empty.copy().grey(63)
                },
                right: {
                    colour: colours.empty.copy().grey(175)
                }
            }
        },
        cutTopCorner = function (x, y) {
            var margin = computerBank.top.height - computerBank.top.center.height;

            if (y > -margin) {
                generator.raster.forEach(function (pixel) {
                    var colour = computerBank.panels.left.colour;
                    if (x > png.width / 2) {colour = computerBank.panels.right.colour; }
                    pixel.set(colour);
                }, x, y + margin, x, y + computerBank.panels.height + margin);
            }

            // Computer top-surface
            generator.raster.forEach(function (pixel, px, py) {
                pixel.set(colours.lightgrey);
            }, x, 0, x, y + computerBank.top.height);

            // Corner-cuts (transparent)
            generator.raster.forEach(function (pixel, px, py) {
                pixel.alpha = 1;
            }, x, 0, x, y - 1);

            // Black outline
            generator.raster.pixel(x, y, colours.black);

            if (y < 0) {
                generator.raster.pixel(x, 0, colours.black);
            }
        };

    generator.raster.forEach(function (pixel) {
        pixel.set(colours.darkgrey);
    }, 0, 0, png.width - 1, computerBank.panels.height);

    // Computer bank top surface
    generator.raster.forEach(function (pixel) {
        pixel.set(colours.lightgrey);
    }, 0, 0, png.width - 1, 7);

    // Top-line
    generator.raster.forEach(function (pixel) {
        pixel.set(colours.black);
    }, 0, 0, png.width - 1, 0);

    // Top lines
    for (i = 0; i < png.width / 2; i += 1) {
        x = i;
        y = (png.height / 2 - Math.floor(i / 2)) - 10;
        cutTopCorner(x, y);

        x = i + Math.floor(png.width / 2);
        y = Math.floor(i / 2) - 10;
        cutTopCorner(x, y);

    }
};
