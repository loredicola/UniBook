define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var LoginView = Utils.Page.extend({

    constructorName: "LoginView",

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.login;
    },

    id: "login",
    className: "page",

    events: {
    },

    render: function() {
      this.el.innerHTML = this.template({});
      return this;
    }
  });

  return LoginView;

});