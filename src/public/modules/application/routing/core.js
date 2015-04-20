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
        "$location",
        "application.constant.routes",
        "application.routes.service",
        "auth.service.login",
        "auth.service.auth",
        "$route",

        function ($scope, $location, root, routes, login, auth, $route) {
            "use strict";

            $scope.navigation = routes;
            $scope.$on("$routeChangeStart", function (event, next, previous) {
                root.deactivate();
                if (next.ancestor) {
                    var primaryRoute = next.ancestor(1);
                    $scope.routeTemplateUrl = primaryRoute.partial();
                    next.active(true);
                    $location.path(routes.redirect(next));
                }
                if (previous && previous.url) {
                    login.redirect(previous.url());
                }
            });

            auth.update();
        }
    ]);
