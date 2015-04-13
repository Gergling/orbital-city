// Processes the routes as a service

angular.module('application').service("application.routes.service", [

    "$location",
    "application.constant.routes",
    "auth.service.auth",

    function ($location, root, auth) {
        var scope = this;

        this.redirect = function (route) {
            var redirect = route.redirect(),
                url;

            if (auth.authenticated()) {
                url = redirect.auth;
            } else {
                url = redirect.guest;
            }
            return url;
        };
        this.primary = function () {
            return root.children().filter(function (route) {
                return !scope.redirect(route);
            });
        };
    }
]);
