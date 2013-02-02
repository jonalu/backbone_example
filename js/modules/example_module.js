define([
  'underscore', 
  'backbone', 
  'handlebars',
  ], 
  
  function( _ , Backbone, Handlebars){

    var module = {

      template : [
        '<h1>{{ title }}</h1>',
        '<p> {{ content }} </p>'
      ].join('/n'),
    
      model : Backbone.Model.extend({

      }),
    
      view : Backbone.View.extend({
        initialize : function(){
          this.template = Handlebars.compile(module.template);
        }
      })
    }

    return module;

});
