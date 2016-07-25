define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var MyModel = require("models/MyModel");
  var StructureView = require("views/StructureView");
  var MyView = require("views/pages/MyView");
  var MapView = require("views/pages/MapView");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "map": "map"
    },

    firstView: "myview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    myView: function() {
      // create a model with an arbitrary attribute for testing the template engine
      var model = new MyModel({
        key: "testValue",
        name: "ciao"
      });
      // create the view
        var page = new MyView({
          model: model
        });
        //trigger a custom event for data ready
        instance.trigger('dataReady');
        // show the view
        this.changePage(page, "slide", "up");
    },

    map: function() {
      // create the view and show it
      var page = new MapView();
      this.changePage(page, "flip", "top");
    },
    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    }

  });
  return AppRouter;

});