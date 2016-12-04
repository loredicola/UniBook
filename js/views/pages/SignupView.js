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
        "click #btn-registrati": "signup"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      this.$form = this.$el.find("#signUpForm");
      return this;
    },
    
    signup: function() {
        var query = Utils.serializeForm(this.$form);
        var user = query.user;
        var password = query.psw;
        var rePassword = query.psw1;
        
    }
  });

  return SignupView;

});