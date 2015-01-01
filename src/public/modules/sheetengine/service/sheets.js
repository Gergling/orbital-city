angular.module("sheetengine").service("sheetengine.service.sheets", [

    // Resources

    function () {
        "use strict";

        var instantiate = [ ],
            run = [ ];

        this.on = function () {
            return {
                instantiation: function (fnc) {
                    if (fnc) {instantiate.push(fnc); }
                    return instantiate;
                },
                run: function (fnc) {
                    if (fnc) {run.push(fnc); }
                    return run;
                }
            };
        };
        this.instantiate = function () {instantiate.forEach(function (fnc) {fnc(); }); };
        this.run = function () {run.forEach(function (fnc) {fnc(); }); };
    }
]);
