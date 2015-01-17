module.exports = function (png) {
    "use strict";

    var Raster = require("./raster"),
        Isometric = require("./isometric");

    this.Pixel = require("./pixel");

    this.raster = new Raster(png);

    this.isometric = new Isometric(png, this.raster);
};
