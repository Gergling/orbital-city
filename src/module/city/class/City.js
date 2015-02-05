module.exports = (function () {
    "use strict";

    var mongoose = require('mongoose'),
        Model = mongoose.model('City', mongoose.Schema({
            name: String,
            tiles: [ require('../schema/tile') ]
        })),
        City = function () {
            var name,
                tiles;

            this.name = function (value) {
                if (value) { name = value; }
                return name;
            };
            this.tiles = function (value) {
                if (value) { tiles = value; }
                return tiles;
            };
            // Add facility, which will include a tile, a location and a facility id.
            // The facility will go through a state of construction until it is finished.

            this.save = function (cb) {
                Model.find({name: name}, function (err, cities) {
                    var model = new Model({name: name});
                    if (err) {
                        cb("error:city/class/City:save()", err);
                    } else {
                        if (cities.length) {
                            cb("cities", cities);
                        } else {
                            model.save(function (a,b,c,d) {
                                cb("created", city,a,b,c,d);
                            });
                        }
                    }
                });
            };
        };

    return City;
}());