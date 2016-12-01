define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var newPostView = Utils.Page.extend({

    constructorName: "NewPostView",

    model: MyModel,

    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.newpost;
    },

    id: "newpost-view",
    className: "page",

    events: {
    },

    render: function() {
      this.el.innerHTML = this.template({});
      return this;
    }
  });

  return newPostView;

});