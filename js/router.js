define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var MyModel = require("models/MyModel");
  var StructureView = require("views/StructureView");
  var HomeView = require("views/pages/HomeView");
  var ProfiloView = require("views/pages/ProfiloView");
  var LoginView = require("views/pages/LoginView");
  var ModificaProfiloView = require("views/pages/ModificaProfiloView");
  var CommentiView = require("views/pages/CommentiView");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "homeview": "homeView",
      "profilo": "showprofilo",
      "login": "login",
      "modificaprofilo": "modificaprofilo",
      "commentiview": "commentiview"
    },

    firstView: "homeview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    homeView: function() {
      // create a model with an arbitrary attribute for testing the template engine
      var model = new MyModel({
        key: "testValue",
        name: "ciao"
      });
      // create the view
        var page = new HomeView({
          model: model
        });
        // show the view
        this.changePage(page);
    },

    showprofilo: function() {
      // create the view and show it
      var page = new ProfiloView();
      this.changePage(page);
    },
    login: function() {
        var page = new LoginView();
        this.changePage(page);
    },
    modificaprofilo: function() {
        // create the view and show it
      var page = new ModificaProfiloView();
      this.changePage(page);
    },
    commentiview: function() {
        // create the view and show it
      var page = new CommentiView();
      this.changePage(page);
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