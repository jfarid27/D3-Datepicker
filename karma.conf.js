// Karma configuration
// Generated on Sat Jun 14 2014 13:00:51 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],

    plugins: [
        'karma-mocha-reporter',
        'karma-jasmine',
        'karma-requirejs',
        'karma-chrome-launcher',
    ],


    // list of files / patterns to load in the browser
    files: [
        //Test Configuration
        {'pattern': 'test/test-main.js', 'included': true},

        //Libraries
        {'pattern': 'node_modules/**/*.js',
            'included':false},
        //Source Files
        {'pattern': 'src/js/**/*.js', 'included':false},

        //Test Files
        {'pattern': 'test/js/**/*.spec\.js', 'included': false}

    ],

    // list of files to exclude
    exclude: [
        'bower_components/**/test/**/*',
        'node_modules/**/test/**/*',
        'src/js/require-main.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    htmlReporter: {
      outputFile: 'log/test/units.html'
    },


    // web server port
    port: 3000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
