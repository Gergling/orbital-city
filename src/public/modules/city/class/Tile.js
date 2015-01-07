angular.module("city").factory("city.class.Tile", [

    "city.class.Point",
    "city.service.view",

    function (Point, view) {
        "use strict";

        // A Tile expresses a Point.
        return function () {
            var point = new Point(),
                size = new Point(100, 50),
                show = true;

            this.left = function () {return (point.x() + point.z() - view.camera().x() - view.camera().z()) * size.x() / 2; };
            this.top = function () {return (point.x() + 1 - point.z() - point.y()) * size.y() / 2; };
            this.size = function () {return size; };
            this.point = function () {return point; };
            this.show = function (value) {
                if (value === false || value) {show = value; }
                return show;
            };
        };
    }
]);
