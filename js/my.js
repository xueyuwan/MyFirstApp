
var ionicPopup;
var scope;
angular.module('ionicApp', ['ionic'])
    .config(function($stateProvider, $urlRouterProvider) {
        //调试对象
        // ionicPopup = $ionicPopup;



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
      });


  $urlRouterProvider.otherwise('/sign-in');
    // .state('forgotpassword', {
    //   url: '/forgot-password',
    //   templateUrl: 'templates/forgot-password.html'
    // })
    // .state('tabs', {
    //   url: '/tab',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html'
    // })
    // .state('tabs.home', {
    //   url: '/home',
    //   views: {
    //     'home-tab': {
    //       templateUrl: 'templates/home.html',
    //       controller: 'HomeTabCtrl'
    //     }
    //   }
    // })
    // .state('tabs.facts', {
    //   url: '/facts',
    //   views: {
    //     'home-tab': {
    //       templateUrl: 'templates/facts.html'
    //     }
    //   }
    // })
    // .state('tabs.facts2', {
    //   url: '/facts2',
    //   views: {
    //     'home-tab': {
    //       templateUrl: 'templates/facts2.html'
    //     }
    //   }
    // })
    // .state('tabs.about', {
    //   url: '/about',
    //   views: {
    //     'about-tab': {
    //       templateUrl: 'templates/about.html'
    //     }
    //   }
    // })
    // .state('tabs.navstack', {
    //   url: '/navstack',
    //   views: {
    //     'about-tab': {
    //       templateUrl: 'templates/nav-stack.html'
    //     }
    //   }
    // })
    // .state('tabs.contact', {
    //   url: '/contact',
    //   views: {
    //     'contact-tab': {
    //       templateUrl: 'templates/contact.html'
    //     }
    //   }
    // });
   $urlRouterProvider.otherwise('/sign-in');
})
.controller('SignInCtrl', function($scope, $state,$ionicPopup,$timeout,popup,$ionicNavBarDelegate) {



    $scope.user = {};

    $scope.signIn = function() {
      if($scope.user.username==""&& $scope.user.password==""){
         popup.show('提示','用户名或密码不能为空');

      }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/.test($scope.user.username)){
        popup.show('提示','请输入正确的手机号');
      }else{
        $state.go('sign-up');
      }
  }
})
    .controller('SignUpCtrl',function($scope,$ionicNavBarDelegate){
            $ionicNavBarDelegate.showBackButton(true);

            $scope.goBack = function(){

                $ionicNavBarDelegate.goBack();

            }

    })
.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});