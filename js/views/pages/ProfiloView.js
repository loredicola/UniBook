define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var ProfiloView = Utils.Page.extend({

    constructorName: "ProfiloView",

    model: MyModel,

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
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },
    goToModificaProfilo: function(event) {
        Backbone.history.navigate("modificaprofilo", {
        trigger: true
      });
    }
  });

  return ProfiloView;

});