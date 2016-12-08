define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  
  var ModificaProfiloView = Utils.Page.extend({

    constructorName: "ModificaProfiloView",


    initialize: function() {
      //load the empty precompiled template if we don't have a data
        this.template = Utils.templates.modificaprofilo;
    },

    id: "modificaprofilo",
    className: "page",

    events: {
    },

    render: function() {
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      return this;
    }
  });

  return ModificaProfiloView;

});/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


