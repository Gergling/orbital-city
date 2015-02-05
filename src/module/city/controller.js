module.exports = (function () {
    var City = require('./class/City');

    return {
        createCity: function (name, cb) {
            //City.find({name: name}).execFind(cb);
            var city = new City();
            city.name(name);
            city.save(cb);
            /*var city = new City();
            city.name = name;
            // Check if city exists
            city.save(cb);*/
        }
    };
}());