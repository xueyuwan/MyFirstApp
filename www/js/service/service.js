angular.module('app.service',[])
  .factory('camera',function($cordovaCamera) {


    return function(action) {
      document.addEventListener("deviceready", function () {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 400,
          targetHeight: 400,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(action);
        //  $cordovaCamera.cleanup().then(...); // only for FILE_URI

      }, false);
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
});
