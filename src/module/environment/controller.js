module.exports = (function () {
    "use strict";

    return {
        environments: function () {
            return require('./config/environments');
        }
    };
}());
