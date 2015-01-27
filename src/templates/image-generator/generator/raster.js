module.exports = function (png) {
    "use strict";

    var extend = require("deep-extend"),
        maths = require("./maths"),
        Pixel = require("./pixel"),
        scope = this;

    this.pixel = function (x, y, pixel) {
        // Todo: Throw exceptions when the x or y are out of bounds
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

    // Todo: Apply a system of filter flag functions which indicate whether the
        // current pixel rests on the edge of a circle or such.
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
    /*this.circle = function (x, y, radius, fnc, options) {
        var dx, dy, i, angle, pixel;

        options = extend({
            radial: {
                start: 0,
                arc: 2 * Math.PI
            },
            scale: {
                x: 1,
                y: 1
            }
        }, options || { });

        for (i = 0; i < options.radial.arc * radius; i+= 1) {
            angle = i / radius;
            dx = radius * Math.sin(angle - options.radial.start) * options.scale.x;
            dy = radius * Math.cos(angle - options.radial.start) * options.scale.y;
            //dx = dx * (dx + dy) / radius;
            //dy = dy * (dx + dy) / radius;
            dx = Math.round(dx) + x;
            dy = Math.round(dy) + y;
            pixel = this.pixel(dx, dy);
            fnc(pixel, dx, dy, angle, i);
            this.pixel(dx, dy, pixel);
        }
        return this;
    };*/
    this.circle = function (x0, y0, radius, fnc, options) {
        var x = radius,
            y = 0,
            radiusError = 1 - x,
            minmax = {min: 1000, max: 0, accepted: {min: 1000, max: 0}},
            options = extend({
                radial: {
                    start: 0,
                    arc: 2 * Math.PI
                },
                scale: {
                    x: 1,
                    y: 1
                }
            }, options || { }),
            twoRSquared = 2 * radius * radius,
            DrawPixel = function (px, py, fnc, args) {
                var pixel,
                    dx = px - x0,
                    dy = py - y0,
                    angle = Math.asin(dx / radius);// + (Math.PI / 2);
                    //angle = Math.acos((twoRSquared - Math.pow(maths.pythagoras(dx, dy), 2)) / twoRSquared);

                //if (dy < 0) {angle = Math.PI - angle; }
                if (dx < 0) {angle = Math.PI - angle; }
                angle += options.radial.start;
                if (angle < 0) {angle += Math.PI * 2; }
                //console.log(angle, dx, dy, options.radial);
                minmax.min = Math.min(minmax.min, Math.round(angle * 100) / 100);
                minmax.max = Math.max(minmax.max, Math.round(angle * 100) / 100);
                //options.radial.start
                if (angle >= options.radial.start && angle <= options.radial.arc + options.radial.start) {
                    minmax.accepted.min = Math.min(minmax.accepted.min, Math.round(angle * 100) / 100);
                    minmax.accepted.max = Math.max(minmax.accepted.max, Math.round(angle * 100) / 100);
                    pixel = scope.pixel(px, py);
                    fnc(pixel, px, py, angle, args);
                    scope.pixel(px, py, pixel);
                }
            };

        while(x >= y)
        {
            DrawPixel(x + x0, y + y0, fnc);
            DrawPixel(y + x0, x + y0, fnc);
            DrawPixel(-x + x0, y + y0, fnc);
            DrawPixel(-y + x0, x + y0, fnc);
            DrawPixel(-x + x0, -y + y0, fnc);
            DrawPixel(-y + x0, -x + y0, fnc);
            DrawPixel(x + x0, -y + y0, fnc);
            DrawPixel(y + x0, -x + y0, fnc);
            y++;
            if (radiusError<0) {
                radiusError += 2 * y + 1;
            } else {
                x--;
                radiusError += 2 * (y - x + 1);
            }
        }
        console.log(minmax);
        console.log(options.radial);

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
