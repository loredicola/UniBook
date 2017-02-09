define(function(require) {

	var Backbone = require("backbone");
	var MyModel = require("models/MyModel");

	var MyCollection = Backbone.Collection.extend({
		constructorName: "MyCollection",
		model: MyModel,
                nextPage : 0,
                count : 4,
                type : null,
                where : null,
                initialize : function(){
                },
                setType : function(type){
                    this.type = type;
                }    
	});

	return MyCollection;
});