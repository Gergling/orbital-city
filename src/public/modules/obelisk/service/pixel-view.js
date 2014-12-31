angular.module("obelisk").service("obelisk.service.pixel-view", [

    // Resources

    function () {
        "use strict";

        var views = { },
            models = { };

        this.view = function (name, canvas) {
            var point, models;

            if (canvas) {
                point = new obelisk.Point(canvas.width() / 2, canvas.height() / 2);
                views[name] = new obelisk.PixelView(canvas, point);
                models = this.models(name);
                if (models) {
                    models.forEach(function (model) {
                        views[name].renderObject(model.polygon, model.p3d);
                    });
                }
            }
            return views[name];
        };

        this.models = function (viewName, polygon, p3d) {
            if (polygon) {
                if (!models[viewName]) {models[viewName] = [ ]; }
                models[viewName].push({ polygon: polygon, p3d: p3d });
            }
            return models[viewName];
        };
    }
]);
