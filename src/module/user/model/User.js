module.exports = (function () {
    "use strict";

    var mongoose = require('mongoose');
     
    return mongoose.model('User',{
        username: String,
        password: String,
        email: String,
        gender: String,
        address: String
    });
}());
