define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var MapView = Utils.Page.extend({

    constructorName: "MapView",

    id: "map",

    initialize: function(options) {
      this.template = Utils.templates.mapwiew;
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
  });

  return MapView;

});