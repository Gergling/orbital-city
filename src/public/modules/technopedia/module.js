angular.module("technopedia", [])

    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        var containerPartial = 'modules/application/partial/container.html';

        $routeProvider.when('/technopedia/:category/', {
            templateUrl: containerPartial, 
            partial: 'modules/technopedia/partial/index.html'
        });

        $routeProvider.otherwise({templateUrl: containerPartial, partial: 'modules/technopedia/partial/404.html'});
    }]);
