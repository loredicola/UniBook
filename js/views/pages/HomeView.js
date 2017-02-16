define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var myCollection = require("collections/MyCollection");
  
  var HomeView = Utils.Page.extend({

    constructorName: "HomeView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.homeview;
        this.collectionPost = new myCollection();
        this.collectionPost.on({
            'add': (this.onAddItem).bind(this)
        });
    },

    id: "homeview",
    className: "page",

    events: {
        "click #mipiace": "addMipiace",
        "click #commenti": "goToCommenti",
        "click #new-post": "newPost",
        "click #notifiche-commento": "notificheCommento",
        "click #notifiche-like": "notificheLike"
    },

    render: function() {
      this.el.innerHTML = this.template();
      this.$container = this.$el.find('.container-my');
      return this;
    },
    
    populate: function(){
        var that = this;
//        this.collectionPost.list();
    },
    onAddItem: function(model){
      var item = this.template({
          model: model
      });
      var $item = $(item);
      model.$el = $item;
      $item.data("model", model);
      this.$container.append($item);
    },
    addMipiace: function(){
        $('#mipiace').attr("disabled", "disabled");
        $('#mipiace').css("color", "red");
    },
    goToCommenti: function(event){
        event.preventDefault();
        event.stopPropagation();
        var target = $(event.target);
        while(!target.hasClass("commenti")){
            target = target.parent();
        }
        var data = target.data("idann");
        Backbone.history.navigate("commentiview/"+data, {
        trigger: true
      });
    },
    newPost: function(){
        Backbone.history.navigate("newpost/new", {
            trigger: true
        });
    },
    notificheCommento: function(event){
        Backbone.history.navigate("notificacommento", {
        trigger: true
      });
    },
    notificheLike: function(event){
        Backbone.history.navigate("notificalike", {
        trigger: true
      });
    }
  });

  return HomeView;

});