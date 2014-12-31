angular.module("obelisk").directive("obelisk", function () {
    "use strict";

    return {
        scope: { obelisk: "@" },
        replace: true,
        //templateUrl: "modules/application/partial/directive-obelisk.html",
        controller: [

            "$scope",
            "$element",
            "obelisk.service.pixel-view",

            function ($scope, $element, views) {
                views.view($scope.obelisk, $element);
            }
        ]
    };
});
