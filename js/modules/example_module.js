/*
*
* Define the dependencies
*/

define([
  'jquery',
  'underscore', 
  'backbone', 
  'handlebars',
  'templates',
  ], 
  
  function( $ , _ , Backbone , Handlebars, Templates ){
    
    var module = {};
      
      module.Player = Backbone.Model.extend({ });

      module.Players = Backbone.Collection.extend({
          model: module.Player
      });

      /* A team contains a collection of players */  
      module.Team = Backbone.Model.extend({
          collection: module.Players,      
          initialize : function(){
                this.collection = new module.Players(this.get('players'));
          }               
      });

      module.Teams = Backbone.Collection.extend({
          model : module.Team,
      });
      
      /* A leage contains a collection of teams*/
      module.League = Backbone.Model.extend({
          /* The URL specifies the API location containing the league data */          
          url: 'js/api/teams.json',  
          collection : module.Teams,
          
          initialize : function(){
              var self = this;
              this.loadData();                     
          },
          loadData: function() {
              var self = this;
              /* The fetch function uses the URL specified in the model */
              this.fetch({
                  success: function(data){                  
                      self.collection = new module.Teams(self.get('teams'));
                      /* Trigger an event called dataloaded, which the view listnes for */
                      self.trigger('dataLoaded');        
                  }
              });
          }
      });

      module.LeagueView = Backbone.View.extend({
          el : '#teamListView',          
          tagName : 'ul',
          model : module.League,
          initialize : function(){
              var self = this;
              /* The models has successfully loaded data, now the view can render it */
              this.model.on('dataLoaded', self.render, this);       
          },
          render : function(){
              var self = this;
              this.$el.empty();
              /* Loop each team model and append a team view */
              _.each(this.model.collection.models, function(team){
                  self.$el.append( new module.TeamListView({ model : team }).render().el );
              });              
          }
      });

     module.TeamListView = Backbone.View.extend({
          tagName : 'li',
          model : module.Team,
          initialize : function(){
              this.template = Handlebars.compile( Templates.TeamListTemplate );      
          },
          /* View can register to events in DOM, within the scope of the view */
          events : {
              'click' : function(){
                  var teamView = new module.TeamView({ model : this.model });                 
              }
          },
          render : function(){
              this.$el.html( this.template(this.model.toJSON()) );
              return this;
          }
      });

    module.TeamView = Backbone.View.extend({
        el: '#teamView',
        model : module.Team,
        initialize : function(){
            this.template = Handlebars.compile( Templates.Tshirt );
            this.render();
        },
        render : function(){
            var self = this;
            this.$el.html( this.template(this.model.toJSON()) );
            _.each( this.model.collection.models, function(player){
                self.$el.append( new module.PlayerView({ model : player }).render().el );  
            });
        }
    });

    module.PlayerView = Backbone.View.extend({
        className: 'player',
        model : module.Player,
        initialize : function(){
            this.template = Handlebars.compile( Templates.Player );
            console.log(this.model);
        },
        render : function(){
            this.$el.html( this.template( this.model.toJSON() ));
            return this;
        }
    });

    return module;

});









