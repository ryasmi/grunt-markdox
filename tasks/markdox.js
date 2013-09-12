module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('markdox', 'A grunt task for running markdox.', function () {
        var markdox = require('markdox');
        var glob = require('glob');
        var options = this.options({});
        var done = this.async();

        options.output = this.data.dest || options.output;
        grunt.file.write(options.output, '');

        glob(this.data.src, function (err, files) {
            markdox.process(files, options, function () {
                grunt.log.writeln('Documentation generated.');
                done();
            });
        });
    });
};