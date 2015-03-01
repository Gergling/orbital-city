module.exports = function (scenario) {
    var Hull = require("../../facility/class/Hull"),
        Thrusters = require("../../facility/class/Thrusters");

    scenario.label("Cygnus 86");
    scenario.description([
        "Cygnus 86 is a black hole requiring special x-ray panel technology to use the",
        "black hole's radiation energy. The time dilation means deliveries arrive faster",
        "than they would elsewhere."
    ].join(" "));
    scenario.generator(function (city) {
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
