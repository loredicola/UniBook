define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var ProfiloView = Utils.Page.extend({

    constructorName: "ProfiloView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.profilo;
    },

    id: "profilo",
    className: "page",

    events: {
        "click #modifica-profilo": "goToModificaProfilo"
    },

    render: function() {
        var that = this;
        $.post("http://localhost:4242/api/profilo", {
            "user": this.model.get("user")
        })
            .then(function (res) {
                that.model.set(res[0]);
                that.el.innerHTML = that.template({model: that.model});
                that.rendered();
                return that;
            })
            .fail(function () {
                showDialog({
                    title: 'Errore',
                    text: 'Errore durante il carcamento del profilo',
                    cancelable: true
                });
            });
    },
    
    rendered: function () {
            this.$edit = this.$el.find(".editIcon");
            this.$imagePlaceHolder = this.$el.find(".imagePlaceHolder");
            if (this.model.get("username") !== router.myUser.get("username")) {
                this.$edit.css("display", "none");
            }
        },
    
    goToModificaProfilo: function(event) {
        Backbone.history.navigate("modificaprofilo", {
        trigger: true
      });
    }
  });

  return ProfiloView;

});