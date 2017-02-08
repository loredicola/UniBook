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
        this.el.innerHTML = this.template({model: this.model});
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