module.exports = (function () {

    "use strict";

    /*global console: true */

    // Vendor Modules =================================================
    var express = require('express'),
        app = express(),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),

        passport = require('passport'),

        //expressSession = require('express-session'),

        port = process.env.PORT || 8080; // set our port

    mongoose.connect(require('./src/module/application/config/db').url);

    // get all data/stuff of the body (POST) parameters
    app.use(bodyParser.json()); // parse application/json

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request.
    // simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));

    // set the static files location /public/img will be /img for users
    app.use(express.static('./src/public'));

    // Configure passport
    //app.use(expressSession({secret: 'mySecretKey'})); // When in use, this key should be in a separate file in application.
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Routing
    require('./src/module/application/controller')(app);

    // start app ===============================================
    app.listen(port); // startup our app at http://localhost:8080

    console.log('Magic happens on port ' + port); // shoutout to the user

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    return app;

}());
