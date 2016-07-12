var $stateProviderReference ;
angular.module('app.route',[])
.config(function($stateProvider, $urlRouterProvider){
    $stateProviderReference = $stateProvider;
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
    });
 
