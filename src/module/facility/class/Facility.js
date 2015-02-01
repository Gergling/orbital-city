module.exports = (function () {
    "use strict";

    return function () {
        var tile = 'hull',
            name,
            label,
            description = "This is a mystery facility. Not only does it not have a description, it does not exist. For that matter, YOU don't exist.",
            requirements = [ ],
            waste = [ ];

        this.name = function (value) {
            if (value) {name = value; }
            return name;
        };
        this.tile = function (value) {
            if (value) { tile = value; }
            return tile;
        };
        this.label = function (value) {
            if (value) { label = value; }
            return label;
        };
        this.description = function (value) {
            if (value) { description = value; }
            return description;
        };
        this.view = function () {
            return {
                name: this.name(),
                label: this.label(),
                description: this.description()
            };
        };
    };
}());