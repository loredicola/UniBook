define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var CommentiView = Utils.Page.extend({

    constructorName: "CommentiView",

    model: MyModel,

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.commentiview;
    },

    id: "commenti",
    className: "page",

    events: {
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      return this;
    }
  });

  return CommentiView;

});