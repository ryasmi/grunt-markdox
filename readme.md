# grunt-markdox

> A grunt task for running [markdox](https://github.com/cbou/markdox).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-markdox --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-markdox');
```

## The "markdox" task

### Overview
In your project's Gruntfile, add a section named `markdox` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    markdox: {
        options: {
            // Task-specific options go here.
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        },
    },
})
```

### Options
Type: `String` or `Array`
Default value: `{}`

#### options.output
Type: `String` or `Array`
Default value: `undefined`

The path of the file to write the generated documentation into.

#### options.formatter
Type: `Function`
Default value: `undefined`

A formatting function that takes a docFile and returns it.

#### options.compiler
Type: `Function`
Default value: `undefined`

A function that takes a filepath and data and returns the compiled data.

#### options.template
Type: `String`
Default value: `undefined`

The template's filepath.

### src
Type: `String` or `Array`
Default value: `undefined`

A string pattern that represents a file or group of files or an array file names.

### dest (shortcut to options.output)
Type: `String` or `Array`
Default value: `undefined`

The path of the file to write the generated documentation into.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
    markdox: {
        target: {
            files: [
                {src: 'src/file1.js', dest: 'docs/file1.md'}
                {src: 'src/file2.js', dest: 'docs/file2.md'}
            ]
        }
    },
})
```

#### Custom Options

```js
grunt.initConfig({
    markdox: {
        options: {
            formatter: function (docfile) {
                return docfile;
            },
            compiler: function(filepath, data){
                return myCustomCompiler(data);
            },
            template: 'output.ejs'
        },
        target: {
            files: [
                {src: 'src/file1.js', dest: 'docs/file1.md'}
                {src: 'src/file2.js', dest: 'docs/file2.md'}
            ]
        }
    },
})
```
