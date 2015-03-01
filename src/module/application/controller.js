module.exports = function (app) {
    "use strict";

    var passport = require('passport'),
        isAuthenticated = function (req, res, next) {
            if (req.isAuthenticated()) {return next(); }
            res.sendStatus(403);
        };

    /*jslint unparam: true */
    app.get('/facilities', function (req, res) {
        var controller = require("../facility/controller");

        res.send(controller.list());
    });
    // PUT/POST put a facility on a specific tile.
    // Consider using websockets.
    // Response can be validation.
    app.post('/facilities', function (req, res) {
        var controller = require("../facility/controller");

        res.send(controller.create(req.params.x, req.params.y, req.params.z, req.params.facilityId));
    });

    /*app.param('cityName', function (req, res, next, name) {
        // TODO: Use the same check for city names when creating the actual city
        var regex = new RegExp(/^[a-zA-Z0-9]$/);
        if (regex.test(name)) {
            next();
        } else {
            next('route');
        }
    });*/
    /*app.param('scenarioName', function (req, res, next, name) {
        var regex = new RegExp(/^[a-zA-Z0-9]$/);
        if (regex.test(name)) {
            next();
        } else {
            next('route');
        }
    });*/
    app.get('/city/:cityName', function (req, res) {
        var controller = require("../city/controller");

        controller.city(req.params.cityName, function (cities) {
            res.send(cities);
        });
    });
    // Todo: Find a way to include player cities without being logged in.
    app.get('/city', isAuthenticated, function (req, res) {
        require("../city/controller").cities(req.session.passport.user, function (cities) {
            res.send(cities);
        });
    });

    app.post('/city', function (req, res) {
        var controller = require("../city/controller");

        controller.create(req.body.name, function (a, b, c, d) {
            res.send([
                a,
                b, 
                c, 
                d
            ]);
        });
    });

    app.get('/scenario', function (req, res) {
        var user = false;
        if (req.session.passport) {user = req.session.passport.user; }
        res.send(require("../scenario/controller").scenarios(user));
    });
    /*app.param('scenarioName', function (req, res, next, name) {
        var regex = new RegExp(/^[a-z]$/);
        if (regex.test(name)) {
            next();
        } else {
            next('route');
        }
    });*/
    app.post('/scenario', isAuthenticated, function (req, res) {
        require("../scenario/controller").generate(
            req.session.passport.user,
            req.body.scenarioName,
            req.body.cityName,
            function (response) {
                res.send(response);
            }
        );
    });

    app.get('/environments', function (req, res) {
        var controller = require("../environment/controller");

        res.send(controller.environments());
    });
    /*jslint unparam: false */

    require("../user/controller");

    /* Handle Login POST */
    app.get('/login', function (req, res) {
        res.send(req.session);
        // req.session.passport.user has the mongo id
        // find the user with db.users.find({_id: ObjectId(id)})
    });
    /* Handle Login POST */
    app.post('/login', passport.authenticate('login', {
        //successRedirect: '/home',
        //failureRedirect: '/',
        failureFlash : true 
    }));

    /* Handle Registration POST */
    app.post('/signup', passport.authenticate('signup', {
        //successRedirect: '/home',
        //failureRedirect: '/signup',
        failureFlash : true 
    }));

};
