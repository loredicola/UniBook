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
            
            listComment: function(idAdd) {
                var idAdd = idAdd;
                var that = this;
                $.post("http://localhost:4242/api/comments", {
                    idAdd: idAdd
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