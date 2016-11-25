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
    },

    render: function() {
      this.el.innerHTML = this.template({});
      return this;
    }
  });

  return ProfiloView;

});