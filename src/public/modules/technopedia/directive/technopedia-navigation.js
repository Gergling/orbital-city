angular.module("technopedia").directive("technopediaNavigation", function () {
    "use strict";

    return {
        scope: { },
        templateUrl: "modules/technopedia/partial/directive-technopedia-navigation.html",
        controller: [

            "$scope",
            "technopedia.service.navigation",

            function ($scope, navigation) {
                $scope.navigation = navigation;
            }
        ]
    };
});
