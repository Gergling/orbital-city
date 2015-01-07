angular.module("city").service("city.service.view", [

    "city.class.Point",

    function (Point) {
        "use strict";

        var size = new Point(500, 250),
            camera = new Point();

        this.size = function () {return size; };
        this.camera = function () {return camera; };
    }
]);
