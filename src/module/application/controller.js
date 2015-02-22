module.exports = function (app) {
    "use strict";

    var passport = require('passport'),

        //User = require('./model/User'),

        fetchUser = function (req) {
            // req.session.passport.user has the mongo id
            // find the user with db.users.find({_id: ObjectId(id)})
            if (req.session.passport.user) {
                User.findById(req.session.passport.user, function () {
                });
            }
        },
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

    app.get('/city', isAuthenticated, function (req, res) {
        require("../city/controller").cities(req.session.passport.user, function (cities) {
            res.send(cities);
        });
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
