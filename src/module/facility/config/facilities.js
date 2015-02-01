module.exports = (function () {
    "use strict";

    var facilities = [ ],
        addFacility = function (className) {
            var FacilityClass = require('./' + className);
            facilities.push(new FacilityClass());
        };

    createFacility("environment", "Environment Generator")
        .description("This generates an atmosphere and suitable temperature for the station.");
    createFacility("residential", "Residential Sector");
    createFacility("industrial", "Industrial Sector");
    return facilities;
}());
