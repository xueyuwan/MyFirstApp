angular.module('chat.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("app.tab", {
            url: "/tab",
            views:{
                "menuContent":{
                    templateUrl: "templates/chat/tabs.html",
                    controller:"chatCtrl"
                }
            }
        })
        .state('app.tab.message', {
            url: '/message',
           views: {
            "tab-message":{
                templateUrl: 'templates/chat/tab-message.html',
                controller: "messageCtrl"
            }
         }
    })
        .state('messageDetail', {
            url: '/messageDetail/:phone',
            templateUrl: "templates/chat/message-detail.html",
            controller: "messageDetailCtrl"
        })
        .state('app.tab.friends', {
            url: '/friends',
            views: {
                "tab-friends": {
                    templateUrl: 'templates/chat/tab-friends.html',
                    controller: "friendsCtrl"
                }
            }
        })
        .state('app.tab.workspace', {
            url: '/workspace',
            views: {
                "tab-workspace": {
                    templateUrl: 'templates/chat/tab-workspace.html',
                    controller: "messageCtrl"
                }
            }
        })
        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/chat/tab-setting.html',
                    controller: "settingCtrl"
                }
            }
        })


    
});