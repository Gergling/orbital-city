module.exports = (function () {
    "use strict";

    var Environment = require('../class/Environment'),
        environments = [ ],
        add = function (name, label) {
            var environment = new Environment();

            environments.push(environment);
            return environment;
        };

    add("earth", "Earth")
        .species("human", "Human", {
            names: {
                1: "Murder-Monkey",
                2: "Quadrupedal Free-fires",
                3: "Homo-cidalis"
            },
            traits: {
                tolerance: {
                    vacuum: 1
                },
                xenophobia: 1
            }
        })
        .species("dog", "Dog", {
            names: {
                1: "Human Minion",
                2: "Human Pet"
            },
            traits: {
                tolerance: {
                    vacuum: 1
                },
                dependence: "human"
            }
        });

    add("shode", "Shode")
        .description("Shode is a low temperature world orbiting a distant brown dwarf.")
        .species("shodan", "Shodan", {
            description: "Due to their homeworld, the Shodan enjoy a much lower temperature than most species. This has made them unusually comfortable in an environmental suit. From outside their suits, they almost pass as humanoid, but without the disguise, their closest similarity is their symmetry, having a mirror-image limb on each side.",
            traits: {
                tolerance: {
                    envosuit: 1
                }
            }
        });

    add("delar", "Delar")
        .species("delarion", "Delarion", {
            description: "Delarion custom dictates that they supply their identity based on the first-impression of the individual they make contact with. Their first contact was with humans, when they found Earth and briefly mistook what they considered to be the dominant species. When they asked Humans to identify what they had first seen, they based their race name on what they were told. Reception has ranged from amusement to hostility."
        });

    add("metroscone", "Metroscone");
    add("rotann", "Rotann");

    return environments;
}());
