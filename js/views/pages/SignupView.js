define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var MyUser = require("models/MyUser");
  
  var SignupView = Utils.Page.extend({

    constructorName: "SignupView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.signup;
        this.myUser = new MyUser();
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
        this.myUser.set("user", query.user);
        this.myUser.set("password", query.psw);
        this.myUser.set("rePassword", query.psw1);
        console.log(this.myUser.attributes);
        
    }
  });

  return SignupView;

});