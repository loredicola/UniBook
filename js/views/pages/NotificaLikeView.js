define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var NotificaLikeView = Utils.Page.extend({

    constructorName: "NotificaLikeView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.notificalike;
    },

    id: "notifica-like-view",
    className: "page",

    events: {

    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      return this;
    }
  });

  return NotificaLikeView;

});