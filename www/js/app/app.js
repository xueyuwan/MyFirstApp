angular.module('app',['ionic','ngCordova',
  'app.controller','app.route','app.service'
])
    //资源白名单
    .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://localhost:3000/**']);
})

    //config 的参数是个数组
    .config(['$ionicConfigProvider',function($ionicConfigProvider){
        $ionicConfigProvider.tabs.position('bottom');
        //本地文件文件访问白名单
        // $compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image\//);

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
