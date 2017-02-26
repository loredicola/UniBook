define(function(require) {

	var Backbone = require("backbone");
	var MyModel = require("models/MyModel");

	var MyCollection = Backbone.Collection.extend({
            constructorName: "MyCollection",
            model: MyModel,
            initialize : function(){
            },
            
            list: function(){
                var that = this;
             $.get("http://localhost:4242/api/posts", {
            }).done(function(res){
                    that.add(res);
                })
                .fail(function(res){
                    console.log("non funziona");
                });   
            },
            
            listComment: function() {
                var that = this;
                $.get("http://localhost:4242/api/comments", {
            }).done(function(res){
                    that.add(res);
                })
                .fail(function(res){
                    console.log("non funziona");
                });
            }
                
	});

	return MyCollection;
});