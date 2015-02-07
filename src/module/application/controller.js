module.exports = function (app) {
    "use strict";

    /*jslint unparam: true */
    app.get('/facilities', function (req, res) {
        var controller = require("../facility/controller");

        res.send(controller.list());
    });
    // PUT/POST put a facility on a specific tile.
    // Consider using websockets.
    // Response can be validation.
    app.post('/facility', function () {
        return true;
    });

    app.post('/city', function (req, res) {
        var controller = require("../city/controller");

        controller.createCity(req.body.name, function (a, b, c, d) {
            res.send([
                a,
                b, 
                c, 
                d
            ]);
        });
    });

    app.get('/environments', function (req, res) {
        var controller = require("../environment/controller");

        res.send(controller.environments());
    });
    /*jslint unparam: false */
};
