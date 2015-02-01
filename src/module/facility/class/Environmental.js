module.exports = (function () {
    "use strict";

    var Facility = require('./Facility'),
        Environmental = function () {
            this.description("The Hull");
        };

    Environmental.prototype = new Facility();
    return Environmental;
}());