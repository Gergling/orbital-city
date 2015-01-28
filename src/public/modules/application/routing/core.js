angular.module("application")

    .config(['$routeProvider', 'application.constant.routes', function ($routeProvider, root) {
        "use strict";

        root.routes($routeProvider);

        $routeProvider.otherwise({templateUrl: root.templateUrl, partial: 'modules/application/partial/404.html'});
    }])

    .controller("application.controller.index", [

        "$rootScope",
        "application.constant.routes",
        "$route",

        function ($scope, root, $route) {
            "use strict";

            $scope.navigation = root.children();
            $scope.$on("$routeChangeStart", function (event, next) {
                $scope.routeTemplateUrl = next.partial();
                next.active(true);
                root.children(next.name());
            });
        }
    ]);
