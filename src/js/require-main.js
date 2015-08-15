(function(){

require.config({

    'baseUrl': '',

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

    'waitSeconds': 1
})

require(['./src/js/app'], function(){

    

    return;
})

})();
