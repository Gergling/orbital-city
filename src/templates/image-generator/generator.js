module.exports = (function () {
    "use strict";

    var grunt = require("grunt"),
        pathService = require("path"),
        fs = require('fs'),
        PNG = require('pngjs').PNG,

        Generator = require("./generator/core"),

        newPNG = function () {
            var png = new PNG();
            if (!png.data) {png.data = [ ]; }
            png.width = 1;
            png.height = 1;
            png.alpha = true;
            return png;
        },
        paths = {
            module: "./",
            generator: "src/templates/image-generator/"
        },
        distFolderPath = paths.generator + "dist/",
        generate = function (fnc, png, gen, dst, fileName) {
            fnc(png, gen);
            png.pack().pipe(dst);
            grunt.log.writeln("- Image generated: '" + fileName + "'");
        };

    if (!grunt.file.isDir(distFolderPath)) {
        grunt.file.mkdir(distFolderPath);
    }

    
    grunt.file.expand(paths.generator + "src/*.js").forEach(function (srcPath) {
        var fileName = pathService.basename(srcPath, ".js"),
            distPath = distFolderPath + fileName + ".png",
            srcImagePath = paths.generator + "src/" + fileName + ".png",
            srcImageStream,
            dst = fs.createWriteStream(distPath),
            png = newPNG(),
            fnc = require(paths.module + "src/" + fileName),
            gen = new Generator(png);

        // Check if file exists: fs.createReadStream(paths.generator + "src/" + fileName + ".png")
        if (typeof fnc === "function") {
            if (grunt.file.exists(srcImagePath)) {
                grunt.log.writeln("- Reading from source image: '" + srcImagePath + "'");
                fs.createReadStream(srcImagePath).pipe(png).on('parsed', function () {generate(fnc, png, gen, dst, fileName); });
            } else {
                generate(fnc, png, gen, dst, fileName);
            }
        } else {
            grunt.log.writeln("- No function exported for: "
                + fileName + ".js");
        }
    });

}());
