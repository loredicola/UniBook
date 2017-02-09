define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var newPostView = Utils.Page.extend({

    constructorName: "NewPostView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.newpost;
        this.on("inTheDOM", this.rendered);
    },

    id: "newpost-view",
    className: "page",

    events: {
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      this.$form = this.$el.find("formPubblicaPost");
      this.$post = this.$el.find("textarea[name=post]");
      return this;
    },
    
    rendered: function(){
        var that = this;
        if(this.model.get("idAdd")){
            
        }
    }
  });

  return newPostView;

});