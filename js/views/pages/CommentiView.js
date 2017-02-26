define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var myCollection = require("collections/MyCollection");
  
  var CommentiView = Utils.Page.extend({

    constructorName: "CommentiView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.commentiview;
        this.templateBoxCommenti = Utils.templates.boxcommenti;
        this.collectionComment = new myCollection();
        this.collectionComment.on({
            'add': (this.onAddItem).bind(this)
        });
        this.rendered();
    },

    id: "commenti",
    className: "page",

    events: {
        "click #pubblicaCommento" : "pubblicaCommento"
    },

    render: function() {
      this.el.innerHTML = this.template();
      this.contentElement = this.$el.find('#content')[0];
      this.$form = this.$el.find('#formPubblicaCommento');
      this.$container = this.$el.find('.container-my');
      return this;
    },
    
    rendered: function() {
        this.populate();
    },
    
    populate: function() {
        var idAdd= this.model.get("idAdd");
        this.collectionComment.listComment(idAdd);
    },
    
    onAddItem: function(model) {
      var item = this.templateBoxCommenti({
          model : model
      });
      var $item = $(item);
      model.$el = $item;
      $item.data("model", model);
      this.$container.append($item);
    },
    
    pubblicaCommento: function(){
        var query = Utils.serializeForm(this.$form);
        if(query.commento !== ''){
            $.post("http://localhost:4242/api/comment", {
              "idcomm": this.model.get('idAdd'),
              "comm": query.commento
            }).done(function(res){
                    showDialog({
                        title: 'Commento pubblicato',
                        text: 'Il commento è stato pubblicato con successo',
                        cancelable: true
                    });
                    Backbone.history.navigate("homeview", {
                        trigger: true
                    });
                })
                .fail(function(res){
                    console.log("non funziona");
                });
        }
        else{
            showDialog({
                title: "Errore",
                text: "Se vuoi commentare devi inserire prima il commento"
            });
        }
    }
  });

  return CommentiView;

});