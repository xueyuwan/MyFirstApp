var rootScope;
angular.module('app',['ionic','ngCordova',
  'app.controller','app.route','app.service',
    'chat.controllers', 'chat.routes',
    'chat.services', 'chat.directives', 'monospaced.elastic'
])
    //资源白名单
    .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://localhost:3000/**',
        'http://localhost:63342/**',
        'http://shsx.alvye.cn/**'
    ]);
    })
    //config 的参数是个数组
    .config(['$ionicConfigProvider',function($ionicConfigProvider,$rootScope,$cordovaContacts){
        $ionicConfigProvider.tabs.position('bottom');
    }])
.run(function($ionicPlatform,$http,messageService,$rootScope){
    var url = "";
    rootScope = $rootScope;
    if (ionic.Platform.isAndroid()) {
        url = "/android_asset/www/";
    }

    //聊天数据
    $http.get(url + "data/json/messages.json").then(function(response) {
        // localStorageService.update("messages", response.data.messages);
        messageService.init(response.data.messages);
    });
    $http.get(url + "data/json/friends.json").then(function(response){
        console.log(response.data.results);
    });

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
