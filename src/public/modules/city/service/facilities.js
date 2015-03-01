angular.module("city").service("city.service.facilities", [

    "$q",
    "Restangular",

    function ($q, Restangular) {
        "use strict";

        // The hull should probably be built before anything else can be built.
        // This will be required for MOST facilities.
        // There may be examples where no hull would be needed.
        // Other facilities would be residential/industrial.
        // Facilities are generated from the backend.

        // This should be the entry point for handling facilites, the API should be here.
        // the technopedia can come here for the information.
        // Consider a way of avoiding numerous requests bashing the server, in favour of doing a bulk request every time.
        // That would mean each time a request was made, it would go into a queue.
        // The queue would be run every time the deferred completes.
        // On failure, make a polite in-character message, talking about how your construction administrators are overworked or possibly ill, and to contact a health-care professional.
        this.build = function (tile, facilityId) {
            var deferred = $q.defer();
            Restangular.all('facilities').post({x: tile.x(), y: tile.y(), z: tile.z(), facilityId: facilityId}).then(function (response) {
                console.log(deferred, response);
            });
            return deferred;
        };
    }
]);
