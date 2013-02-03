/*
* auth jlu
* A module definition contains a Handlebars template and Backbone View/Model/Collection[s]
*/

define([
  'jquery',
  'underscore', 
  'backbone', 
  'handlebars',
  ], 
  
  function( $ , _ , Backbone , Handlebars ){

    var module = {

      Template : [

          '<h1>{{title}}</h1>',
          '<p>{{content}}</p>'
      
      ].join('\n'),
    
      Model : Backbone.Model.extend({        
          url: 'js/api/data.json'                 
      }),
    
      View : Backbone.View.extend({
          initialize : function(){
              this.template = Handlebars.compile( module.Template );
              var self = this; 
              this.model.fetch({
                  success : function(){ self.render(); }
              });             
          },
          render : function(){
              this.$el.html(this.template( this.model.toJSON() ));
          }
      })

    };

    return module;

});
