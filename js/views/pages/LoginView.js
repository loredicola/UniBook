define(function(require) {

    var $ = require("jquery");
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
        "click #loginButton": "login",
        "click #btn-signup": "signup"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      this.$form = this.$el.find("#loginForm");
      return this;
    },
    
    login: function() {
        var query = Utils.serializeForm(this.$form);
        var user = query.user;
        var pwd = query.password;
        
    },
    
    signup: function(event) {
        Backbone.history.navigate("signup", {
        trigger: true
      });
    }
  });

  return LoginView;

});