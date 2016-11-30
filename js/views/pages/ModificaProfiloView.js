define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  
  var ModificaProfiloView = Utils.Page.extend({

    constructorName: "ModificaProfiloView",

    model: MyModel,

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
      return this;
    }
  });

  return ModificaProfiloView;

});/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


