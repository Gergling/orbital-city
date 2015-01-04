angular.module("sheetengine").directive("sheetengine", function () {
    "use strict";

    return {
        scope: { },
        replace: true,
        controller: [

            "$scope",
            "$element",
            "sheetengine.service.sheets",

            function ($scope, $element, sheets) {
                sheetengine.scene.init($element.get(0), {w:600,h:400});

                sheets.instantiate();

                // Todo: Use $timeout, find time difference.
                setInterval(function () {
                    sheets.run();
                    sheetengine.calc.calculateChangedSheets();
                    sheetengine.drawing.drawScene(true);
                }, 30);
            }
        ]
    };
});
