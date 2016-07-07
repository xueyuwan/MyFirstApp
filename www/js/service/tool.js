angular.module('app.service')
.factory('camera',function($cordovaCamera) {
    return function(action) {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
        };

        $cordovaCamera.getPicture(options).then(action,function(err) {
            // error
            alert(err);
             });
        }

    
}).factory('popup',function($ionicPopup,$timeout){
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