define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var SignupView = Utils.Page.extend({

    constructorName: "SignupView",

    model: MyModel,

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.signup;
    },

    id: "signup-view",
    className: "page",

    events: {
    },

    render: function() {
      this.el.innerHTML = this.template({});
      return this;
    }
  });

  return SignupView;

});