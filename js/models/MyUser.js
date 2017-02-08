define(function(require) {

	var Backbone = require("backbone");

	var MyUser = Backbone.Model.extend({
		constructorName: "MyUser",
            
            getInfo: function () {
            var that = this;
            var defer = $.Deferred();
            return defer.promise();
            }
	});

	return MyUser;
});