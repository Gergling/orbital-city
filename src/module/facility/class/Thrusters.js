module.exports = (function () {
    "use strict";

    var Facility = require('./Facility'),
        Thrusters = function () {
            this.label("Thrusters");
            this.description("This keeps cruel and unusual gravitational fields from pulling the station out of orbit.");
        };

    Thrusters.prototype = new Facility();
    return Thrusters;
}());