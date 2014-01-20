/**
 * @author Ryan Smith
 */

module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('markdox', 'A grunt task for running markdox.', function () {
        var markdox = require('markdox');
        var options = this.options({});
        var destinations = getDestinations(this.files);
        var done = this.async();
        var dests = Object.keys(destinations);
        var complete = taskFactory(dests.length, function () {
            grunt.log.writeln('Documentation generated.');
            done();
        });

        dests.forEach(function (dest) {
            options.output = dest;

            if (!grunt.file.exists(dest)) {
                grunt.file.write(dest, '');
            }

            markdox.process(destinations[dest], options, complete);
        });
    });

    var taskFactory = function (tasks, callback) {
        tasks += 1;
        return (function me() {
            if (!(tasks -= 1)) {
                callback();
            }
            return me;
        }());
    };

    var getDestinations = function (orignalDests) {
        var finalDests = {};

        orignalDests.forEach(function (destObj) {
            var dest = destObj.dest;

            destObj.src.forEach(function (src) {
                if (!src.length || !grunt.file.exists(src)) {
                    grunt.log.warn('"' + src + '" not found.');
                } else {
                    finalDests[dest] = finalDests[dest] || [];
                    finalDests[dest].push(src);
                }
            });
        });

        return finalDests;
    };
};
