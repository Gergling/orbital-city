angular.module("application").constant("application.constant.routes", (function () {
    "use strict";

    var Route = function () {
            var children = [ ],
                url = '/',
                name = '',
                label = '',
                partial = '',
                active = false,
                level = 0,
                parent,
                redirect = { };

            this.level = function (value) {return level; };
            this.ancestor = function (value) {
                var ancestor;
                if (value === level) {
                    ancestor = this;
                } else if (value < level) {
                    ancestor = parent.ancestor(value);
                } else {
                    throw new Error("application.constant.routes.Route#ancestor(): Route level '" + level + "' is greater than requested level '" + value + "' and therefore unreachable.");
                }
                return ancestor;
            };
            this.name = function (value) {
                if (value) {name = value; }
                return name;
            };
            this.label = function (value) {
                if (value) {label = value; }
                return label;
            };
            this.partial = function (value) {
                if (value) {partial = value; }
                return partial;
            };
            this.url = function (value) {
                if (value && parent) {
                    url = parent.url() + value + '/';
                }
                return url;
            };
            this.routes = function ($routeProvider) {
                if (level > 0) {
                    $routeProvider.when(this.url(), this);
                }
                this.children().forEach(function (route) {
                    route.routes($routeProvider);
                });
            };
            this.add = function (name, label, partial) {
                var route = new Route();
                route.parent(this);
                route.name(name);
                route.label(label);
                route.partial(partial);
                route.url(name);
                children.push(route);
                return route;
            };
            this.children = function (filter) {
                var filtered = children;
                if (filter) {
                    filtered = children.filter(function (child) {
                        return filter === child.name();
                    });
                }
                return filtered;
            };
            this.parent = function (route) {
                if (route) {
                    if (!(route instanceof Route)) {throw new Error("application.constant.routes.Route#parent: supplied route not of type Route.");}
                    parent = route;
                    level = parent.level() + 1;
                }
                return parent;
            };

            this.deactivate = function () {
                active = false;
                this.children().forEach(function (child) {
                    child.deactivate();
                });
                return this;
            };
            this.active = function (value) {
                if ((value || value === false) && parent) {
                    this.parent().active(value);
                    active = value;
                }
                return active;
            };
            this.redirect = function (value) {
                if (value) {
                    redirect = angular.extend(redirect, value);
                }
                return redirect;
            };
            this.activeDescendant = function () {
                var descendant = this;
                this.children().forEach(function (child) {
                    if (child.active()) {
                        descendant = child.activeDescendant();
                    }
                });
                return descendant;
            };
            // Activate, deactivate, get active node, get whether active
            // Run down the line of active children until the last one is reached.
            this.run = function (fnc) {
                fnc(this);
                return this;
            };

            this.templateUrl = 'modules/application/partial/container.html';
        },
        root = new Route(),
        partial = function (module, name) {
            return 'modules/' + module + '/partial/' + name + '.html';
        };

    // Displayed for guest only
    [
        root.add('login', 'Login', partial('auth', 'login')), // Control visibility from an auth module service hook.
        root.add('register', 'Register', partial('auth', 'register'))
    ].forEach(function (route) {
        route.redirect({ auth: '/city/' });
    });

    // Displayed for authenticated only
    [
        root.add('profile', 'Profile', partial('player', 'profile')),
        root.add('city', 'City', partial('city', 'city')),
        root.add('scenario', 'Scenarios', partial('scenario', 'list')).run(function (route) {
            route.add(':id', 'Scenario', partial('scenario', 'detail'));
        }),
        root.add('overview', 'Overview', partial('application', 'index'))
    ].forEach(function (route) {
        route.redirect({ guest: '/login/' });
    });

    // Displayed for everybody
    root.add('news', 'News', partial('application', 'recruitment'));
    root.add('technopedia', 'Technopedia', 'modules/technopedia/partial/index.html').run(function (route) {
        route.redirectTo = route.url() + 'facilities/';
        route.add('facilities', 'Facilities', 'modules/technopedia/partial/facilities.html');
        route.add('stations', 'Stations', 'modules/technopedia/partial/stations.html');
        route.add('opportunities', 'Opportunities', 'modules/technopedia/partial/opportunities.html');
        route.add('aliens', 'Aliens', 'modules/technopedia/partial/aliens.html');
    });

    // Any authenticated page accessed by a guest redirects to login page.
    return root;
}()));
