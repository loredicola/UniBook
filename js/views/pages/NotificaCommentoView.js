define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var NotificaCommentoView = Utils.Page.extend({

    constructorName: "NotificaCommentoView",

    model: MyModel,

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.notificacommento;
    },

    id: "notifica-commento-view",
    className: "page",

    events: {

    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      return this;
    }
  });

  return NotificaCommentoView;

});