angular.module("application").constant("application.constant.routes", (function () {
    "use strict";

    var Route = function () {
            var children = [ ],
                url = '/',
                name = '',
                label = '',
                partial = '',
                active = false,
                parent;

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
                $routeProvider.when(this.url(), this);
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
                }
                return parent;
            };

            this.deactivate = function () {active = false; };
            this.active = function (value) {
                if (value || value === false) {
                    this.parent().children().forEach(function (route) {
                        route.deactivate();
                    });
                    active = value;
                }
                return active;
            };
            this.run = function (fnc) {
                fnc(this);
                return this;
            };

            this.templateUrl = 'modules/application/partial/container.html';
            this.$filter = function (value) {$filter = value; };
        },
        root = new Route();

    root.add('overview', 'Overview', 'modules/application/partial/index.html').url('/');
    root.add('recruitment', 'Recruitment', 'modules/application/partial/recruitment.html');
    root.add('technopedia', 'Technopedia', 'modules/technopedia/partial/index.html').run(function (route) {
        route.add('facilities', 'Facilities', 'modules/technopedia/partial/facilities.html');
        route.add('stations', 'Stations', 'modules/technopedia/partial/stations.html');
        route.add('opportunities', 'Opportunities', 'modules/technopedia/partial/opportunities.html');
        route.add('aliens', 'Aliens', 'modules/technopedia/partial/aliens.html');
    });

    return root;
}()));
