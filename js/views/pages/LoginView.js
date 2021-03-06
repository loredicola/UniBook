define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
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
//      var home = $('#home');
//        var menu = $('#menu');
//        var title = $('.title');
//        home.hide();
//        menu.hide();
//        title.css('width', '100%');
      return this;
    },
    
    login: function() {
        var query = Utils.serializeForm(this.$form);
        this.model.set("user", query.user);
        this.model.set("pwd", query.password);
            $.post("http://localhost:4242/api/login", {
              "user": query.user,  
              "password": query.password
            }).always(function(res){
                if(res === "Logged In!"){
                    console.log(res);
                    localStorage.setItem('logged', 'yes');
                    Backbone.history.navigate("homeview", {
                      trigger: true
                    });
                } else {
                    showDialog({
                        title: 'Login errato',
                        text: 'Username o password errate',
                        cancelable: true
                    });
                }
                });
    },
    
    signup: function(event) {
        Backbone.history.navigate("signup", {
        trigger: true
      });
    }
  });

  return LoginView;

});