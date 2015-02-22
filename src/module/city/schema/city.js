module.exports = (function () {
    var Schema = require('mongoose').Schema;

    return new Schema({
        name: String,
        tiles: [ require('../schema/tile') ]
    });
}());