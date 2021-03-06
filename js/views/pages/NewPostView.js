define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var myModel = require("models/MyModel");
  image = {};
  
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
        this.pubblicaFoto();
    },
    
    pubblicaPost: function(e){
        var post = {};
        post.descrizione = this.$post.val();
        post.autore = router.myUser.get("user");
        this.model.set(post);
//        UPLOAD FOTO CON DISPOSITIVO
//            e.preventDefault();
//            e.stopPropagation();
//            var that = this;
//            var success = function (image) {
//              
//            };
//            var error = function (error) {
//                alert(error);
//            };
//            navigator.camera.getPicture(success, error,
//                    {
//                        quality: 50,
//                        allowEdit: true,
//                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
//                        destinationType: navigator.camera.DestinationType.DATA_URL,
//                        mediaType: Camera.MediaType.PICTURE,
//                        encodingType: Camera.EncodingType.JPEG
//                    })
//        CHIAMATA AL SERVER
        $.post("http://localhost:4242/api/newpost", {
              "post": post.descrizione,
              "autore": post.autore,
              "img": image
            }).done(function(res){
                    showDialog({
                        title: 'Post pubblicato',
                        text: 'Il post è stato pubblicato con successo',
                        cancelable: true
                    });
                    Backbone.history.navigate("homeview", {
                      trigger: true
                    });
                })
                .fail(function(res){
                    console.log("non funziona");
                });
    },
    
    pubblicaFoto: function() {
        $("#image").change(function() {
            if (this.files && this.files[0]){
                var reader = new FileReader();
                reader.onload = mio;
                reader.readAsDataURL(this.files[0]);
                console.log(reader);
            }
        function mio(e){
            image = e.target.result;
        }
        });
        
    }
    
  });

  return newPostView;

});