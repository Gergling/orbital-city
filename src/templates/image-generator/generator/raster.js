module.exports = function (png) {
    "use strict";

    var extend = require("deep-extend"),
        maths = require("./maths"),
        Pixel = require("./pixel");

    this.pixel = function (x, y, pixel) {
        if (pixel) {
            pixel.toPNG(png.data, this.channel(x, y));
        } else {
            pixel = new Pixel();
            pixel.fromPNG(png.data, this.channel(x, y));
        }
        return pixel;
    };
    this.channel = function (x, y) {
        return (png.width * y + x) * 4;
    };

    this.forEach = function (fnc, fromX, fromY, toX, toY) {
        var x, y, channel, pixel;

        fnc = fnc || function () {return true; };
        fromX = fromX || 0;
        fromY = fromY || 0;
        toX = toX === undefined ? png.width - 1 : toX;
        toY = toY === undefined ? png.height - 1 : toY;

        for (y = fromY; y <= toY; y += 1) {
            for (x = fromX; x <= toX; x += 1) {
                //channel = (png.width * y + x) * 4;
                channel = this.channel(x, y);

                pixel = new Pixel(
                    png.data[channel],
                    png.data[channel + 1],
                    png.data[channel + 2],
                    png.data[channel + 3]
                );

                fnc(pixel, x, y);

                pixel.toPNG(png.data, channel);
            }
        }
    };

    this.line = function (fnc, fromX, fromY, toX, toY) {
        var dx = toX - fromX,
            dy = toY - fromY,
            distance = maths.pythagoras(dx, dy),
            pixel,
            i,
            x,
            y;

        for (i = 0; i < distance; i += 1) {
            x = Math.floor(maths.interpolate(fromX, toX, 0, distance, i));
            y = Math.floor(maths.interpolate(fromY, toY, 0, distance, i));
            pixel = this.pixel(x, y);
            fnc(pixel, x, y, i);
            this.pixel(x, y, pixel);
        }
        return distance;
    };
    this.circle = function (x, y, radius, fnc, options) {
        var dx, dy, i, angle, pixel;

        options = extend({
            radial: {
                start: 0,
                arc: 2 * Math.PI
            }
        }, options || { });
        //maths.pythagoras(
        //pyth = x^2 + y^2 = r^2
        //for (dx = -radius; dx < radius; dx += 1) {
            //dy = Math.sqrt(Math.pow(r, 2) - Math.pow(dx, 2));
            
        //}
        // Find out how many pixels in the circumference, then loop those.
            // It's going to be 2 * pi * radius
        for (i = 0; i < options.radial.arc * radius; i+= 1) {
            angle = i / radius;
            dx = radius * Math.sin(angle + options.radial.start);
            dy = radius * Math.cos(angle + options.radial.start);
            pixel = this.pixel(dx, dy);
            fnc(pixel, dx, dy, angle, i);
            this.pixel(dx, dy, pixel);
        }
        return this;
    };

    this.gradient = function (start, end, fromX, fromY, toX, toY) {
        var from, to, current;

        fromX = fromX || 0;
        fromY = fromY || 0;
        toX = toX || png.width;
        toY = toY || png.height;

        from = maths.pythagoras(fromX, fromY);
        to = maths.pythagoras(toX, toY);

        this.forEach(function (pixel, x, y) {
            current = maths.pythagoras(x, y);
            pixel.setGradient(start, end, from, to, current, pixel);
        }, fromX, fromY, toX, toY);
    };
};
