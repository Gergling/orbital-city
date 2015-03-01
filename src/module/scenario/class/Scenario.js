module.exports = function () {
    "use strict";

    var name,
        label,
        description,
        generator,
        locked = [ ];

    this.name = function (value) {
        if (value) {name = value; }
        return name;
    };
    this.label = function (value) {
        if (value) {label = value; }
        return label;
    };
    this.description = function (value) {
        if (value) {description = value; }
        return description;
    };
    this.locked = function (value) {
        if (value) {locked = value; }
        return locked;
    };
    this.generator = function (value) {
        if (value) {generator = value; }
        return generator;
    };

    this.view = function () {
        return {
            name: name,
            label: label,
            description: description,
            locked: locked,
            capital: "Lots",
            image: "what do you think this is? a web app?"
        };
    };

    this.generate = function (cityName, cb) {
        var city = new City();
        if (!generator) {
            throw new Error("scenario.class.Scenario#generator(): Scenario has no generator function.");
        } else {
            city.name(cityName);
            city.scenarioName(name);
            generator(city);
            city.save(cb);
        }
        return city;
    };

    this.city = function (userId, cb) {
        // Find city generated for this scenario
        Model.find({name: name}, function (err, cities) {
            var model = new Model({
                name: name,
                scenarioName: scenarioName
            });
            if (err) {
                cb("error:city/class/City:save()", err);
            } else {
                if (cities.length) {
                    cb("cities", cities);
                } else {
                    model.save(function (a,b,c,d) {
                        cb("created", a,b,c,d);
                    });
                }
            }
        });

    };
};
