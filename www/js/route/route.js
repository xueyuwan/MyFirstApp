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
          .state('music-app', {
            url: '/music/app',
            abstract: true,
            templateUrl: 'templates/music/menu.html',
            controller: 'menuCtrl'
          })
          .state('music-app.profile', {
            url: '/music/profile',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/profile.html'
              }
            }
          })
          .state('music-app.profile1', {
            url: '/profile1',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/profile_1.html'
              }
            }
          })
          .state('music-app.music', {
            url: '/music',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/music.html'
              }
            }
          })
          .state('music-app.feeds', {
            url: '/feeds',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/feeds.html',
                // controller: 'FeedCtrl'
              }
            }
          })
          .state('music-app.notification', {
            url: '/notification',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/notification.html',
                // controller: 'NotificationCtrl'
              }
            }
          })
          .state('music-app.photo', {
            url: '/photo',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/photo.html'
              }
            }
          })
          .state('music-app.setting', {
            url: '/setting',
            views: {
              'menuContent': {
                templateUrl: 'templates/music/states/setting.html'
              }
            }
          });
    });
 
