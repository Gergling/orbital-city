module.exports = function (scenario) {
    var Hull = require("../../facility/class/Hull"),
        Thrusters = require("../../facility/class/Thrusters");

    scenario.label("A World Away");
    scenario.description([
        "Alpha Centauri is a binary star system in the Laniakea super cluster.",
        "Due to the distance between the stars, maintaining a safe orbit is",
        "complicated and requires special equipment. This results in a high",
        "initial investment to build an orbital station.",
    ].join(" "));
    scenario.generator(function (city) {
        // Starting city.
        // Special tiles function as standard facility but include some kind of
        // fancy thruster graphics
        var x = 0,
            z = 0,
            facilities = [
                [ false,    'hull',     false ],
                [ 'hull',   'thrust',   'hull' ],
                [ false,    'hull',     false ]
            ];

        facilities.forEach(function (row, x) {
            row.forEach(function (name, z) {
                var facility;
                if (name) {
                    switch(name) {
                    case "hull":
                        facility = new Hull();
                        break;
                    case "thrust":
                        facility = new Thrusters();
                        break;
                    }
                    city.facility(x, 0, z, facility);
                }
            });
        });

        return true;
    });
};
