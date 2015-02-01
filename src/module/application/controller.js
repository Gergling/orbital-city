module.exports = function (app) {
    "use strict";

    /*jslint unparam: true */
    app.get('/facilities', function (req, res) {
        var facilitiesController = require("../facility/controller");

        res.send(facilitiesController.list());
    });
    /*jslint unparam: false */
};
