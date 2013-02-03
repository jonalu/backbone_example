requirejs.config({

    baseUrl: 'js/',
    paths: {
      'jquery'     : 'libs/jquery',
      'backbone'   : 'libs/backbone',
      'underscore' : 'libs/underscore',
      'handlebars' : 'libs/handlebars'
    },
    shim : {
        'handlebars' : {
            exports : 'Handlebars'
        }
    }

});

