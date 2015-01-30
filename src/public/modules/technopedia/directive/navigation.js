angular.module("technopedia").directive("technopediaNavigation", function () {
    "use strict";

    return {
        scope: { },
        templateUrl: "modules/technopedia/partial/directive-navigation.html",
        controller: [

            "$scope",
            "application.constant.routes",

            function ($scope, root) {
                $scope.navigation = root.children('technopedia')[0].children();
            }
        ]
    };
});
