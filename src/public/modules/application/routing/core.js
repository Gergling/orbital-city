angular.module("application")

    .config([

        '$routeProvider',
        'application.constant.routes',

        function ($routeProvider, root) {
            "use strict";

            root.routes($routeProvider);

            $routeProvider.when('/', {redirectTo: '/overview/'});
            $routeProvider.otherwise({templateUrl: root.templateUrl, partial: 'modules/application/partial/404.html'});
        }
    ])

    .controller("application.controller.index", [

        "$rootScope",
        "application.constant.routes",
        "$route",

        function ($scope, root, $route) {
            "use strict";

            $scope.navigation = root.children();
            $scope.$on("$routeChangeStart", function (event, next) {
                if (next.ancestor) {
                    var primaryRoute = next.ancestor(1);
                    $scope.routeTemplateUrl = primaryRoute.partial();
                    primaryRoute.active(true);
                } else {
                    root.children().forEach(function (route) {
                        route.active(false);
                    });
                }
                //console.log(next.name());
                //root.children(next.name());
            });
        }
    ]);
