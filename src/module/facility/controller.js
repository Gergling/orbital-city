module.exports = (function () {
    "use strict";

    return {
        list: function () {
            return require('./config/facilities');
        },
        available: function (facilityId) {
            // Calculate which tiles should be available to build the facility.
            // Return list of tiles.
        },
        put: function (x, y, z, facilityId) {
            // Put facility according to id on location given by x, y, z
            // A facility needs to be instantiated, configured and saved.
            // The response will indicate success or failure.
        }
    };
}());
