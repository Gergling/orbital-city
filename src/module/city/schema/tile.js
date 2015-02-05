module.exports = (function () {
    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    return new Schema({
        x: Number,
        y: Number,
        z: Number
    });
}());
