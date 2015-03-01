module.exports = (function () {
    "use strict";

    var extend = require('deep-extend'),
        Facility = require('./Facility'),
        Space = function () {
            // You can't build one of these.
            // You can build a hull on one of these.
            // If there is a hull, this tile disappears.
            this.label("Empty Space");
            this.description("Space. The final front ear. Please contact your doctor, should further mutations occur.");
            this.view = function () {
                return extend(this.prototype.view(), {
                });
            };
        };

    Space.prototype = new Facility();
    return Space;
}());
