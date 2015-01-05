angular.module("city").factory("city.class.Facility", [

    // Resources

    function () {
        "use strict";

        var Facility = function () {
            var waste = [ ],
                requiredResource = [ ];

            this.waste = function (value) {
                if (value) {
                    // Todo: Check waste is correct instance type.
                    waste.push(value);
                }
                return waste;
            };
            this.requiredResource = function (value) {
                if (value) {
                    // Todo: Check value is a ResourceQuantity
                    requiredResource.push(value);
                }
                return requiredResource;
            };
        };

        return function (FacilitySubClass) {
            // Prototype Facility.
            var abstractFacility = new Facility();
            FacilitySubClass.prototype = abstractFacility;
            FacilitySubClass.prototype.constructor = FacilitySubClass;
            FacilitySubClass.prototype.parent = abstractFacility;
            return new FacilitySubClass();
        };
    }
]);
