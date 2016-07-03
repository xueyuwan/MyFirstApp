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
          .state('app.menu3', {
            url: '/menu3',
            views: {
              'menuContent': {
                templateUrl: 'templates/app/states/menu3.html'
              }
            }
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
          });
    });
 
