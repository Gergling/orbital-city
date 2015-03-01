module.exports = (function () {
    "use strict";

    var deepExtend = require("deep-extend"),
        mongoose = require('mongoose'),
        Model = mongoose.model('City', require("../schema/city")),
        City = function () {
            var id,
                name,
                scenarioName,
                tiles = [ ],
                modelProperties = [
                    "scenarioName",
                    "name"
                ];

            this.id = function (value) {
                if (value) { id = value; }
                return id;
            };
            this.name = function (value) {
                if (value) { name = value; }
                return name;
            };
            this.scenarioName = function (value) {
                if (value) { scenarioName = value; }
                return scenarioName;
            };
            this.facility = function (x, y, z, name) {
                // Start building a facility, or get the facility at the location.
                if (typeof x !== "undefined" && typeof y !== "undefined" && typeof z !== "undefined") {
                    if (name) {
                        //create it
                        //return facility
                    } else {
                        
                        // get it
                    }
                } else {
                    // get all
                }
            };
            this.model = function (model) {
                var ext = { };

                modelProperties.forEach(function (prop) {
                    ext[prop] = this[prop]();
                });

                return deepExtend(model || { }, ext);
            };
            // Add facility, which will include a tile, a location and a facility id.
            // The facility will go through a state of construction until it is finished.

            this.find = function (cb) {
                Model.find({name: name}, function (err, cities) {
                    var response = { };
                    if (err) {
                        response.error = err;
                        response.message = "city/class/City:find()";
                    } else {
                        response.cities = cities;
                    }
                    cb(response);
                });
            };
            this.save = function (cb) {
                var scope = this;

                this.find(function (response) {
                    if (response.cities) {
                        if (response.cities.length) {
                            // Todo: Needs to update
                            // Also, which function are you using?
                            //cb("cities", cities);
                            model = cities[0];
                            model = scope.model(model);
                        }
                        model.save(function (a,b,c,d) {
                            cb("created", a,b,c,d);
                        });
                    } else {
                        cb(response);
                    }
                });
                /*Model.find({name: name}, function (err, cities) {
                    var model = new Model({
                        name: name,
                        scenarioName: scenarioName
                    });
                    if (err) {
                        cb("error:city/class/City:save()", err);
                    } else {
                        if (cities.length) {
                            // Todo: Needs to update
                            // Also, which function are you using?
                            //cb("cities", cities);
                            model = cities[0];
                            model = scope.model(model);
                        }
                        model.save(function (a,b,c,d) {
                            cb("created", a,b,c,d);
                        });
                    }
                });*/
            };
        };

    return City;
}());