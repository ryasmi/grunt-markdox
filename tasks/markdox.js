module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('markdox', 'A grunt task for running markdox.', function () {
        var markdox = require('markdox');
        var options = this.options({});
        var validFiles = removeInvalidFiles(this.files);
        var done = this.async();
        var complete = (function () {
            var remaining = validFiles.length;

            return function () {
                remaining -= 1;
                if (!remaining) {
                    grunt.log.writeln('Documentation generated.');
                    done();
                }
            };
        }());

        validFiles.forEach(function (f) {
            options.output = f.dest;

            if (!grunt.file.exists(f.dest)) {
                grunt.file.write(f.dest, '');
            }

            grunt.log.writeln(f.src + ' : ' + f.dest);

            markdox.process(f.src, options, function () {
                complete();
            });
        });
    });

    var removeInvalidFiles = function (files) {
        return files.filter(function (f) {
            if (!f.src.length || !grunt.file.exists(f.src)) {
                grunt.log.warn('"' + f.src + '" not found.');
                return false;
            } else {
                grunt.log.writeln(f.src + ' exists.');
                return true;
            }
        });
    };
};
