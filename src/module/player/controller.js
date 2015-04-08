module.exports = (function () {
    var Player = require("../player/model/Player");

    return {
        profile: function (userId, done, error) {
            Player.findOne({userId: userId}, function (err, player) {
                if (err) {
                    error(err);
                } else {
                    done({
                        name: player.name,
                        gender: {
                            male: 0,
                            female: 0,
                            other
                        }
                    });
                }
            });
        }
    };
}());