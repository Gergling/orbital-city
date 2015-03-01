module.exports = (function () {
    "use strict";

    var Facility = require('./Facility'),
        Environmental = function () {
            this.label("Environment Generator");
            this.description("This generates an atmosphere and suitable temperature for the station. Everyone loves being able to breathe.");
        };

    Environmental.prototype = new Facility();
    return Environmental;
}());