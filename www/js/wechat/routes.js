angular.module('wechat.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("app.tab", {
            url: "/tab",
            views:{
                "menuContent":{
                    templateUrl: "templates/chat/tabs.html",
                }
            }
        })
        .state('app.tab.message', {
            url: '/message',

                    templateUrl: 'templates/chat/tab-message.html',
                    controller: "messageCtrl"


        })
        .state('messageDetail', {
            url: '/messageDetail/:messageId',
            templateUrl: "templates/chat/message-detail.html",
            controller: "messageDetailCtrl"
        })
        .state('app.tab.friends', {
            url: '/friends',

                    templateUrl: 'templates/chat/tab-friends.html',
                    controller: "friendsCtrl"


        })
        .state('tab.find', {
            url: '/find',
            views: {
                'tab-find': {
                    templateUrl: 'templates/chat/tab-find.html',
                    controller: "findCtrl"
                }
            },
        })
        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/chat/tab-setting.html',
                    controller: "settingCtrl"
                }
            }
        });

    
});