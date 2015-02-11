angular.module("city").factory("city.class.Tile", [

    "city.class.Point",
    "city.service.view",

    function (Point, view) {
        "use strict";

        // A Tile expresses a Point.
        return function () {
            var point = new Point(),
                size = new Point(100, 50),
                show = true,
                hover = false;

            this.left = function () {return ((point.x() + point.z() - view.camera().z()) * size.x() / 2) + view.camera().x(); };
            this.top = function () {return ((point.x() + 1 - point.z() - point.y()) * size.y() / 2) + view.camera().y(); };
            this.size = function () {return size; };
            this.point = function () {return point; };
            this.show = function (value) {
                if (value === false || value) {show = value; }
                return show;
            };
            this.hover = function (value) {
                if (value || value === false) {hover = value; }
                return hover;
            };
            this.boundsCheck = function (x, y) {
                var half = {
                        w: size.x() / 2,
                        h: size.y() / 2
                    },
                    asc = x / 2,
                    desc = half.h - asc,
                    quad = {
                        h: (x < half.w ? "left": "right"),
                        v: (y < half.h ? "top": "bottom"),
                    },
                    tests = [
                        quad.h === "left" && quad.v === "top" && y > desc,
                        quad.h === "right" && quad.v === "top" && y > asc - half.h,
                        quad.h === "left" && quad.v === "bottom" && y < asc + half.h,
                        quad.h === "right" && quad.v === "bottom" && y < desc + size.y()
                    ],
                    inside = false;

                tests.forEach(function (test) {
                    if (test) {inside = true; }
                });

                return inside;
            };
        };
    }
]);
