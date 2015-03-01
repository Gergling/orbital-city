module.exports = (function () {
    "use strict";

    var extend = require('deep-extend'),
        Facility = require('./Facility'),
        Infrastructure = function () {
            var name,
                label,
                currentLevel = 0,
                maxLevel = 2,
                levels = [ ],
                addLevel = function (level, name, label) {
                    levels.push({
                        level: level,
                        name: name,
                        label: label
                    });
                };

            this.name = function (value) {
                if (value) { name = value; }
                return name;
            };
            this.label = function (value) {
                if (value) { label = value; }
                return label;
            };
            this.upgrade = function () {
                if (currentLevel <= maxLevel) {
                    currentLevel += 1;
                }
                return this;
            };

            addLevel(0, "none", "None");
            addLevel(1, "basic", "Basic");
            addLevel(2, "premium", "Premium");
        },
        Hull = function () {
            var infrastructure = [ ],
                addInfrastructure = function (name, label) {
                    var i = new Infrastructure();
                    i.name(name);
                    i.label(label);
                    infrastructure.push(i);
                };

            addInfrastructure("power", "Power");
            addInfrastructure("water", "Water");
            addInfrastructure("data", "Data");

            this.label("Hull");
            this.description("Depending on how much you want to spend, each hull tile can include a configuration of infrastructure. Any infrastructured tile can only benefit from that infrastructure if they are next to an appropriate source or an enabled infrastructure of their type. Infrastructure requires maintenance.");

            /*console.log(this, this.prototype);
            this.view = function () {
                return extend(this.prototype.view(), {
                    // Include infrastructure information
                });
            };*/
        };

    Hull.prototype = new Facility();
    return Hull;
}());
