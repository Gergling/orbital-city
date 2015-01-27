angular.module("technopedia").service("technopedia.service.navigation", [

    // Resources

    function () {
        "use strict";

        var list = [ ],
            add = function (name, label) {
                list.push({
                    name: name,
                    label: label,
                    url: '/technopedia/' + name + '/'
                });
            };

        add("facility", "Facility");
        add("stations", "Stations");
        add("opportunities", "Opportunities");
        add("aliens", "Aliens");

        this.list = list;

        this.activate = function (active) {
            list.forEach(function (item) {
                item.active = false;
            });
            active.active = true;
        };
        this.activate(list[0]);
    }
]);
