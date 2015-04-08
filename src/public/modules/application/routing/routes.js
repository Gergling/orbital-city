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
                visible = true;

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
                    filtered = [ ];
                    children.forEach(function (child) {
                        if (filter === child.name()) {
                            filtered.push(child);
                        }
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
            this.visible = function (value) {
                if (value || value === false) {
                    visible = value;
                }
                return visible;
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

    // Todo: New primary nav
        // Login (Default - Guest)
        // Register (Guest)
        // City (Default - Auth)
        // Technopedia
    // Todo: New routes
        /* 
            /register/
            /login/
            /city/ - views list of player's cities
            /city/:id/ - gameplay screen
            /scenario/ - views list of scenarios
            /scenario/:id/ - views specific scenario
        */
        // Registration page: needs easy access for the non-authenticated.
    root.add('login', 'Login', partial('auth', 'login')); // Control visibility from an auth module service hook.
    root.add('register', 'Register', partial('auth', 'register'));
    root.add('city', 'City', partial('city', 'city'));
    root.add('scenario', 'Scenarios', partial('scenario', 'list')).run(function (route) {
        route.add(':id', 'Scenario', partial('scenario', 'detail'));
    });
    root.add('overview', 'Overview', partial('application', 'index'));
    root.add('recruitment', 'Recruitment', partial('application', 'recruitment'));
    root.add('technopedia', 'Technopedia', 'modules/technopedia/partial/index.html').run(function (route) {
        route.redirectTo = route.url() + 'facilities/';
        route.add('facilities', 'Facilities', 'modules/technopedia/partial/facilities.html');
        route.add('stations', 'Stations', 'modules/technopedia/partial/stations.html');
        route.add('opportunities', 'Opportunities', 'modules/technopedia/partial/opportunities.html');
        route.add('aliens', 'Aliens', 'modules/technopedia/partial/aliens.html');
    });

    return root;
}()));
