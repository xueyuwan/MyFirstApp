angular.module('ionicApp')
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
});