module.exports = (function () {

    "use strict";

    var Player = require("../player/model/Player"),
        findPlayer = function (userId, done, error) {
            Player.findOne({userId: userId}, function (err, player) {
                if (err) {
                    error(err);
                } else {
                    done(player);
                }
            });
        };

    return {
        profile: function (userId, done, error) {
            findPlayer(userId, function (player) {
                done({
                    userId: userId,
                    name: player.name,
                    gender: {
                        male: player.male,
                        female: player.female
                    }
                });
            }, error);
        },
        edit: function (userId, data, done, error) {
            findPlayer(userId, function (player) {
                // Todo: Validate data
                // Save to player
                player.name = data.name;
                console.log("Before edit:", player);
                player.save(function (err, p) {
                    if (err) {throw err; }
                    console.log("After edit:", p);
                    done(p);
                });
            }, error);
        }
    };
}());