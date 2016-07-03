angular.module('app',['ionic','ngCordova',
  'app.controller','app.route','app.service'
])
    //config 的参数是个数组
    .config(['$ionicConfigProvider',function($ionicConfigProvider){
    $ionicConfigProvider.tabs.position('bottom');
}])
.run(function($ionicPlatform,$http){
    var url = "";
    if (ionic.Platform.isAndroid()) {
        url = "/android_asset/www/";
    }


    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });


});
