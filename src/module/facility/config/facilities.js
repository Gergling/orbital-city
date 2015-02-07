module.exports = (function () {
    "use strict";

    var facilities = [ ],
        addFacility = function (className) {
            var FacilityClass = require('../class/' + className),
                facility = new FacilityClass();

            facilities.push(facility.view());
        };

    addFacility("Hull");
    addFacility("Environmental");
    //createFacility("residential", "Residential Sector");
    //createFacility("industrial", "Industrial Sector");
    return facilities;
}());
