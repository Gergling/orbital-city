angular.module("application")

    .config(['$routeProvider', 'application.constant.routes', function ($routeProvider, routes) {
        "use strict";

        var containerPartial = 'modules/application/partial/container.html';

        routes.forEach(function (route) {
            route.templateUrl = containerPartial;
            $routeProvider.when(route.url, route);
        });

        $routeProvider.otherwise({templateUrl: containerPartial, partial: 'modules/application/partial/404.html'});
    }])

    .controller("application.controller.index", [

        "$rootScope",
        "application.service.primary-navigation",

        function ($scope, navigation) {
            "use strict";

            $scope.navigation = navigation;
            $scope.$on("$routeChangeStart", function (event, next) {
                $scope.routeTemplateUrl = next.partial;
                navigation.setActive(next.name);
            });
        }
    ]);
