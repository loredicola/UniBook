define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var MenuView = Utils.Page.extend({

    constructorName: "MenuView",


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
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },
    goToProfilo: function(event) {
      Backbone.history.navigate("profilo/"+router.myUser.get("user"), {
        trigger: true
      });
    }
  });

  return MenuView;

});