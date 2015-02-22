module.exports = (function () {
    var City = require('./class/City'),
        Player = require("../player/model/Player");

    return {
        cities: function (userId, done, error) {
            Player.findOne({userId: userId}, function (err, player) {
                if (err) {
                    error(err);
                } else {
                    if (player) {
                        done(player.cities);
                    } else {
                        player = new Player({userId: userId});
                        player.save();
                        done([ ]);
                    }
                }
            });
        },
        createCity: function (name, cb) {
            //City.find({name: name}).execFind(cb);
            var city = new City();
            city.name(name);
            city.save(cb);
            /*var city = new City();
            city.name = name;
            // Check if city exists
            city.save(cb);*/
        },
        tiles: function () {
            // All city tiles must be returned.
            // Each one will have a list of facility options
            // This will most likely be just a list of hull tiles.
            return true;
        }
        // Demolish - x, y, z
    };
}());