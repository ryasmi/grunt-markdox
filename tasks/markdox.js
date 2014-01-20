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
            if (!grunt.file.exists(dest)) {
                grunt.file.write(dest, '');
            }

            markdox.process(destinations[dest], {
                output: dest,
                formatter: options.formatter,
                compiler: options.compiler,
                template: options.template
            }, complete('Generated: ' + dest));
        });
    });

    var taskFactory = function (tasks, callback) {
        tasks += 1;
        return (function me(log) {
            return function () {
                if (log) {
                    grunt.log.writeln(log);
                }
                if (!(tasks -= 1)) {
                    callback();
                }
                return me;
            };
        }(''))();
    };

    var getDestinations = function (orignalDests) {
        var finalDests = {};

        orignalDests.forEach(function (destObj) {
            var dest = destObj.dest;
            finalDests[dest] = finalDests[dest] ? finalDests[dest].concat(destObj.src) : destObj.src;
        });

        return finalDests;
    };
};
