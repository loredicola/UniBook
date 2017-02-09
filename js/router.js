define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var StructureView = require("views/StructureView");
  var HomeView = require("views/pages/HomeView");
  var ProfiloView = require("views/pages/ProfiloView");
  var LoginView = require("views/pages/LoginView");
  var ModificaProfiloView = require("views/pages/ModificaProfiloView");
  var CommentiView = require("views/pages/CommentiView");
  var MenuView = require("views/pages/MenuView");
  var NewPostView = require("views/pages/NewPostView");
  var SignupView = require("views/pages/SignupView");
  var NotificaLikeView = require("views/pages/NotificaLikeView");
  var NotificaCommentoView = require("views/pages/NotificaCommentoView");
  
  var MyUser = require("models/MyUser");
  var MyModel = require("models/MyModel");
  var OUser = require("models/OUser");
  var MyCollection = require("collections/MyCollection");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "homeview": "homeView",
      "profilo/:username": "showProfilo",
      "login": "login",
      "modificaprofilo": "modificaProfilo",
      "commentiview": "commentiView",
      "menu": "showMenu",
      "newpost/:id": "newPost",
      "signup": "signup",
      "notificalike": "notificaLike",
      "notificacommento": "notificaCommento"
    },

    firstView: "homeview",

    initialize: function(options) {
      this.currentView = undefined;
      this.myUser = new MyUser();
      this.myCollection = new MyCollection();
      this.showStructure();
    },

    homeView: function() {
      // create the view
        var page = new HomeView({
            collection: this.myCollection,
            model: this.myUser
        });
        // show the view
        this.changePage(page);
    },

    showProfilo: function(username) {
        username = username || false;
        var model;
        if(!username || this.myUser.get('user') === username){
            model = this.myUser;
        } else{
            model = new OUser({
                'username' : username
            });
        }
      var page = new ProfiloView({
          model: model
      });
      this.changePage(page);
    },
    login: function() {
        var page = new LoginView({
            model: this.myUser
        });
        this.changePage(page);
    },
    modificaProfilo: function() {
        // create the view and show it
      var page = new ModificaProfiloView({
          model: this.myUser
      });
      this.changePage(page);
    },
    commentiView: function() {
        // create the view and show it
      var page = new CommentiView();
      this.changePage(page);
    },
    showMenu: function() {
        // create the view and show it
      var page = new MenuView();
      this.changePage(page);
    },
    newPost: function(id) {
       
       var model = new MyModel(); 
       model.set("idAdd", id);
       var page = new NewPostView({model: model});
       this.changePage(page);
    },
    signup: function() {
        // create the view and show it
      var page = new SignupView();
      this.changePage(page);
    },
    notificaLike: function() {
      // create the view and show it
      var page = new NotificaLikeView();
      this.changePage(page);
    },
    notificaCommento: function() {
      // create the view and show it
      var page = new NotificaCommentoView();
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