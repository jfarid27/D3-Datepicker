(function(){
  var allTestFiles = [];
var TEST_REGEXP = /spec\.js$/;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
}

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
})

require.config({

    'baseUrl': '/base',

    'paths': {
        'backbone': ['node_modules/backbone/backbone'],
        'underscore': ['node_modules/underscore/underscore'],
        'jquery': ['node_modules/jquery/dist/jquery'],
        'moment': ['node_modules/moment/moment'],
        'd3': ['node_modules/d3/d3']
    },

    'shim': {
        'underscore': {
            'exports': '_',
        },
        'jquery': {
            'exports': '$',
        },
        'backbone': {
            'exports': 'Backbone',
            'deps': ['jquery', 'underscore']
        },
        'd3': {
            'exports': 'd3'
        }
    },

    'waitSeconds': 6,

    'deps': allTestFiles,

    'callback': window.__karma__.start
})

})();
