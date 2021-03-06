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
        this.myUser.set("nome", query.nome);
        this.myUser.set("cognome", query.cognome);
        this.myUser.set("datanascita", query.datanascita);
        this.myUser.set("luogonascita", query.luogonascita);
        this.myUser.set("email", query.email);
        this.myUser.set("telefono", query.telefono);
        if(query.psw === query.psw1){
            $.post("http://localhost:4242/api/signup", {
              "user": query.user,  
              "password": query.psw,  
              "repassword": query.psw1,
              "nome": query.nome,
              "cognome": query.cognome,
              "datanascita": query.datanascita,
              "luogonascita": query.luogonascita,
              "email": query.email,
              "telefono": query.telefono
            }).done(function(res){
                    console.log("ci siamo");
                    Backbone.history.navigate("login", {
                      trigger: true
                    });
                })
                .fail(function(res){
                    console.log("non funziona");
                });
        }
        else{
            showDialog({
                        title: 'Password errata',
                        text: 'Le password non coincidono',
                        cancelable: true
                    });
        }
        localStorage.setItem('personalData', JSON.stringify({
            username: query.user, 
            nome : query.nome,
            cognome: query.cognome,
            datanascita: query.datanascita,
            luogonascita: query.luogonascita,
            email: query.email,
            telefono: query.telefono
            })
        );
    }
  });

  return SignupView;

});