define(function(require) {

	var Backbone = require("backbone");

	var MyUser = Backbone.Model.extend({
		constructorName: "MyUser",
            
            getInfo: function () {
            
            }
	});

	return MyUser;
});