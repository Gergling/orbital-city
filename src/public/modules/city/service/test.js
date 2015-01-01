angular.module("city").service("city.service.test", [

    "obelisk.service.pixel-view",

    function (views) {
        "use strict";

        (function () {
            var dimension = new obelisk.CubeDimension(40, 40, 40),
                color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.PINK),
                cube = new obelisk.Cube(dimension, color, true);

            views.models("main", cube, new obelisk.Point3D(0, 0, 0));
        }());

        (function () {
            var dimension = new obelisk.CubeDimension(40, 40, 40),
                gray = obelisk.ColorPattern.GRAY,
                color = new obelisk.CubeColor().getByHorizontalColor(gray),
                cube = new obelisk.Cube(dimension, color, true);

            views.models("main", cube, new obelisk.Point3D(0, 10, 10));
        }());

        (function () {
            var dimension = new obelisk.CubeDimension(6, 100, 6),
                gray = obelisk.ColorPattern.GRAY,
                t,
                x,
                z;

            for(t = 0; t < Math.PI; t += 0.1) {
                x = t * Math.cos(t);
                z = t * Math.sin(t);
                views.models("main", new obelisk.Cube(
                    dimension,
                    new obelisk.CubeColor().getByHorizontalColor(gray),
                    true),
                new obelisk.Point3D(x, 0, z));
            }
        }());
    }
]);
