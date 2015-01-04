angular.module("sheetengine").service("sheetengine.service.polygon-prism", [

    // Resources

    function () {
        "use strict";

        this.generate = function (location, radius, length, faces, opts) {
            var se = window.sheetengine,
                sheets = [ ],
                faceWidth = (Math.PI * radius * 2 / faces) + 3,
                tube,
                i,
                t,
                tD,
                sheet,
                rotator;

            opts = angular.extend({
                mod: function () {return true; },
                start: 0,
                end: faces
            }, opts, true);

            for (i = opts.start; i < opts.end; i += 1) {
                t = i * Math.PI * 2 / faces;
                tD = i * 360 / faces;
                sheet = new se.Sheet(
                    {
                        x: 0,
                        y: - radius * Math.cos(t) - (faceWidth / 2 * Math.sin(t)),
                        z: radius * Math.sin(t)  - (faceWidth / 2 * Math.cos(t))
                    },
                    {alphaD: tD, betaD: 0, gammaD: 0},
                    {w: faceWidth, h: length}
                );
                /*rotator = new se.SheetObject(
                    {x: 0, y: 0, z: 0},
                    {alphaD: 0, betaD: 0, gammaD: 0},
                    [sheet],
                    {w: length, h: faceWidth}
                );*/
                //rotator.rotate({x: 1, y: 0, z: 0}, t);
                //console.log(sheets.length, sheet); 
                //sheets = sheets.concat(rotator.sheets);
                sheets.push(sheet);
                opts.mod(sheet);
                sheet.context.fillRect(0,0,length,faceWidth);
                //rotator.sheets = [ ];
                //rotator.destroy();
            }
            //console.log(rotator);
            tube = new se.SheetObject(
                location,
                {alphaD: 0, betaD: 0, gammaD: 0},
                sheets,
                {w: 100, h: 100, relu:40,relv:50}
            );
            return tube;
        };
    }
]);
