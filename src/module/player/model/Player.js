module.exports = (function () {
    "use strict";

    return require('mongoose').model('Player',{
        userId: String,
        cities: [ require("../../city/schema/city") ]
    });
}());
