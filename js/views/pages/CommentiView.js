define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var CommentiView = Utils.Page.extend({

    constructorName: "CommentiView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.commentiview;
    },

    id: "commenti",
    className: "page",

    events: {
        "click #pubblicaCommento" : "pubblicaCommento"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      this.$form = this.$el.find('#formPubblicaCommento');
      return this;
    },
    
    pubblicaCommento: function(){
        var query = Utils.serializeForm(this.$form);
        if(query.commento !== ''){
            console.log('il commento è presente');
        }
        else{
            console.log('nessun commento');
        }
    }
  });

  return CommentiView;

});