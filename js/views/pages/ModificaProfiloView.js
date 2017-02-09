define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
  
    var ModificaProfiloView = Utils.Page.extend({

    constructorName: "ModificaProfiloView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.modificaprofilo;
    },

    id: "modificaprofilo",
    className: "page",

    events: {
        "click .modificaProfilo-button.salva": "modificaProfilo"
    },

    render: function() {
      this.el.innerHTML = this.template({model: this.model});
      this.contentElement = this.$el.find('#content')[0];
      this.$name = this.$el.find("input[name=name]");
      this.$surname = this.$el.find("input[name=surname]");
      this.$date = this.$el.find("input[name=date]");
      this.$luogo = this.$el.find("input[name=luogo]");
      this.$email = this.$el.find("input[name=email]");
      this.$phone = this.$el.find("input[name=phone]");
      return this;
    },
    
    modificaProfilo: function() {
        var data = {};
        data.name = this.$name.val();
        data.surname = this.$surname.val();
        data.date = this.$date.val();
        data.luogo = this.$luogo.val();
        data.email = this.$email.val();
        data.phone = this.$phone.val();
        router.myUser.set("visibleDataProfilo", data);
//        router.myUser.update()
//                    .then(function () {
//                        hideLoading();
                        router.myNavigate("profilo/" + router.myUser.get("username"));

//                    })
//                    .fail(function () {
//                        hideLoading();
//                        showDialog({
//                            title: 'Errore upload',
//                            text: 'Errore durante il l aggiornamento del profilo utente',
//                            cancelable: true
//                        });
//                    });
    }
  });

  return ModificaProfiloView;

});/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


