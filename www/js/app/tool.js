angular.module('app.service').
factory('config',function(){
    return {
        serverUrl:'http://192.168.1.39:3000/',
        phoneRegex:/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/,
        passwordRegex:/^[a-zA-Z]\w{5,17}$/,
        userNameRegex:/^[a-zA-Z]\w{5,17}$/
    }
})
.factory('camera',function($cordovaCamera) {
    return function(action) {
        document.addEventListener("deviceready", function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 800,
                targetHeight: 800,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(action, function (err) {
                // error
            });

        }, false);
    }
    })
    .factory('popup',function($ionicPopup,$timeout){
    return{
        show:function(title,subTitle){
            var pop =     $ionicPopup.show({
                title:title,
                subTitle:subTitle
            });
            $timeout(function(){
                pop.close()
            },2000);
        }
    }
})
    .factory('imagePicker',function($cordovaImagePicker){
        var options = {
            width: 800,
            height: 800,
            quality: 80
        };

       return {
           pickOne:function(cellback){
                options.maximumImagesCount= 1;
                   $cordovaImagePicker.getPictures(options)
                  .then(cellback,function(error){
                       alert(error);
                   });
            }
       }
    });





