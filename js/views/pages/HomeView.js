define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var HomeView = Utils.Page.extend({

    constructorName: "HomeView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.homeview;
    },

    id: "homeview",
    className: "page",

    events: {
        "click #mipiace": "addMipiace",
        "click #commenti": "goToCommenti",
        "click #new-post": "newPost",
        "click #notifiche-commento": "notificheCommento",
        "click #notifiche-like": "notificheLike"
    },

    render: function() {
      this.el.innerHTML = this.template();
      return this;
    },
    
    addMipiace: function(){
        $('#mipiace').attr("disabled", "disabled");
        $('#mipiace').css("color", "red");
    },
    goToCommenti: function(event){
        Backbone.history.navigate("commentiview", {
        trigger: true
      });
    },
    newPost: function(){
        Backbone.history.navigate("newpost/new");
    },
    notificheCommento: function(event){
        Backbone.history.navigate("notificacommento", {
        trigger: true
      });
    },
    notificheLike: function(event){
        Backbone.history.navigate("notificalike", {
        trigger: true
      });
    }
  });

  return HomeView;

});