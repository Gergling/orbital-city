module.exports = (function () {

    "use strict";

    return require('mongoose').model('Player',{
        userId: String,
        name: String,
        cities: [ require("../../city/schema/city") ]
    });
}());
