(function(){

require.config({

    'baseUrl': '',

    'paths': {
        'backbone': ['node_modules/backbone/backbone'],
        'underscore': ['node_modules/underscore/underscore'],
        'jquery': ['node_modules/jquery/dist/jquery'],
        'moment': ['node_modules/moment/moment'],
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
    },

    'waitSeconds': 1
})

require(['./app.js', 'moment', 'underscore'], function(){
    debugger
    return;
})

})();
