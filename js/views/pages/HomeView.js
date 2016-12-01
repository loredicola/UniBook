define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var like = 0;
  
  var HomeView = Utils.Page.extend({

    constructorName: "HomeView",

    model: MyModel,

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.homeview;
    },

    id: "homeview",
    className: "page",

    events: {
        "click #mipiace": "incrementLike",
        "click #commenti": "goToCommenti",
        "click #new-post": "newPost"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    incrementLike: function(){
        like++;
    },
    goToCommenti: function(event){
        Backbone.history.navigate("commentiview", {
        trigger: true
      });
    },
    newPost: function(event){
        Backbone.history.navigate("newpost", {
        trigger: true
      });
    }
  });

  return HomeView;

});