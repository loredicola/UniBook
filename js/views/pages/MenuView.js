define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var MenuView = Utils.Page.extend({

    constructorName: "MenuView",

    model: MyModel,

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.menu;
    },

    id: "menu-view",
    className: "page",

    events: {
        "click #profilo": "goToProfilo"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      return this;
    },
    goToProfilo: function(event) {
      Backbone.history.navigate("profilo", {
        trigger: true
      });
    }
  });

  return MenuView;

});