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
        "click #pubblicaPost": "pubblicaPost"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      this.$post = this.$el.find("textarea[name=post]");
      return this;
    },
    
    rendered: function(){
        var that = this;
        if(this.model.get("idAdd")){
            
        }
    },
    
    pubblicaPost: function(){
        var post = this.$post.val();
        $.post("http://localhost:4242/api/newpost", {
              "post": post
            }).done(function(res){
                    alert("post pubblicato con successo");
                    Backbone.history.navigate("homeview", {
                      trigger: true
                    });
                })
                .fail(function(res){
                    console.log("non funziona");
                });
    }
  });

  return newPostView;

});