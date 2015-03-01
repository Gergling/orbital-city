module.exports = (function () {
    "use strict";

    var pathUtil = require('path'),
        
        Scenario = require('./class/Scenario'),
        scenarios = { };

    require('grunt').file.expand('./src/module/scenario/config/*').forEach(function (path) {
        var scenarioName = pathUtil.basename(path, '.js'),
            config = require('./config/' + scenarioName),
            scenario = new Scenario();

        scenario.name(scenarioName);
        config(scenario);
        scenarios[scenarioName] = scenario;
    });

    return {
        scenarios: function (userId) {
            // userId defines availability of scenarios
            var available = [ ];
            Object.keys(scenarios).forEach(function (scenarioName) {
                var scenario = scenarios[scenarioName];
                // If player meets scenario pre-requisites, add to list
                available.push(scenario.view());
                // If player almost meets pre-requisites, add to list, but include the fact that the user does not meet said pre-requisites
                // If player already has a city for the scenario, it is locked due to the Conglomerate Fission Act of 2118, which ultimately prohibits
                // a single private entity from owning multiple space stations in the same system. Don't worry though, we have lobbyists working on it.
                //scenario.locked(reasons);
            });
            return available;
        },
        generate: function (userId, scenarioName, cityName, cb) {
            // check if scenario is locked for user
            // if it is, return false,
            // otherwise, true
            var scenario = scenarios[scenarioName],
                response = { };

            if (scenario) {
                // Check if scenario is locked for user
                // Return lock reasons
                // Run scenario generation
                scenario.generate(cityName);
                response.message = "City created";
                cb(response);
            } else {
                response.error = true;
                response.message = "No scenario with name '" + scenarioName + "'.";
                cb(response);
            }
        }
    };
}());