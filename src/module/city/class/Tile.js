module.exports = (function () {
    "use strict";

    var mongoose = require('mongoose'),
        Model = mongoose.model('Tile', require('../schema/tile')),
        Tile = function (x, y, z, city) {
            var x,
                y,
                z,
                city; 

            this.x = function (value) {
                if (value) { x = value; }
                return x;
            };
            this.y = function (value) {
                if (value) { y = value; }
                return y;
            };
            this.z = function (value) {
                if (value) { z = value; }
                return z;
            };
            this.city = function (value) {
                if (value) { city = value; }
                return city;
            };
            this.model = function () {
                return {
                    x: x,
                    y: y,
                    z: z
                };
            };

            // Multiple facilities (e.g. hull + something)
            /*this.save = function () {
                Model.find({name: name}, function (err, tiles) {
                    var model = new Model({name: name});
                    if (err) {
                        cb("error:city/class/Tile:save()", err);
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
            };*/
        };

    //Tile;

    return Tile;
}());
