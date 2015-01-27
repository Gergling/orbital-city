angular.module("application").constant("application.constant.routes", (function () {
    "use strict";

    var Route = function (name, label, partial) {
            this.name = name;
            this.label = label;
            this.partial = partial;
            this.url = '/' + name + '/';
        },
        routes = [ ],
        route = function (name, label, partial) {
            routes.push(new Route(name, label, partial));
        };

    route('overview', 'Overview', 'modules/application/partial/index.html');
    routes[0].url = '/';
    route('recruitment', 'Recruitment', 'modules/application/partial/recruitment.html');
    route('technopedia', 'Technopedia', 'modules/technopedia/partial/index.html');

    return routes;
}()));
