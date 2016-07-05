angular.module('app.route',[])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html',
        controller: 'SignInCtrl'
      })
      .state('sign-up',{
        url:'/sign-up',
        templateUrl:'templates/sign-up.html',
        controller:'SignUpCtrl'
      })
      .state('forgot-password',{
        url:'/forgot-password',
        templateUrl:'templates/forgot-password.html',
        controller:'forgotPasswordCtrl'
      });

  $urlRouterProvider.otherwise('/sign-in');
})
    .config(function($stateProvider,$urlRouterProvider){
      $stateProvider
          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/app/menu.html',
            controller: 'menuCtrl'
          })
          .state('app.message', {
            url: '/message',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/message.html'
              }
            }
          })
          .state('app.menu2', {
            url: '/menu2',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/menu2.html'
              }
            }
          })
          .state('app.menu2.message', {
              url: '/message',
              controller: 'tabMessageCtrl',
              views: {
                  'tab-message': {
                      templateUrl: 'templates/app/states/tab-message.html'
                  }
              }
          })
          
          .state('app.menu2.friends', {
              url: '/friends',
              controller: 'tabFriendsCtrl',
              views: {
                  'tab-friends': {
                      templateUrl: 'templates/app/states/tab-friends.html'
                  }
              }
          })

          .state('app.menu2.find', {
              url: '/find',
              controller: 'tabFindCtrl',
              views: {
                  'tab-find': {
                      templateUrl: 'templates/app/states/tab-find.html'
                  }
              }
          })

          .state('app.menu2.setting', {
              url: '/setting',
              controller: 'tabSettingCtrl',
              views: {
                  'tab-setting': {
                      templateUrl: 'templates/app/states/tab-setting.html'
                  }
              }
          })

          //app界面的模板云
          .state('app.templateyun', {
            url: '/templateyun',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/templateyun.html',
                  controller:'TemplateYun'
              }
            }
          })
          //进入模板云
          .state('templateIndex',{
              url:'/templateIndex',
              params:{index:null,config:null},
              templateUrl:'templates/templateyun/index.html',
              controller:'TemplateIndex'
          })
          .state('app.menu4', {
            url: '/menu4',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/menu4.html',
                // controller: 'FeedCtrl'
              }
            }
          })
          .state('app.menu6', {
            url: '/notification',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/menu6.html',
                // controller: 'NotificationCtrl'
              }
            }
          })
          .state('app.music', {
            url: '/music',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/music.html'
              }
            }
          })
          .state('app.setting', {
            url: '/setting',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/setting.html'
              }
            }
          })
          .state('intro',{
              url:'/intro',
              templateUrl:'templates/intro.html'
          });
    });
 
