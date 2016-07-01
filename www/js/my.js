
var ionicPopup;
var scope;
angular.module('ionicApp', ['ionic'])
    .constant('serverUrl','http://localhost:3000/web')
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
      })
      .state('forgot-password',{
          url:'/forgot-password',
          templateUrl:'templates/forgot-password.html',
          controller:'sendMassageCtrl'
      })




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
.controller('SignInCtrl', function($http,$scope, $state,$ionicPopup,$timeout,popup,$ionicNavBarDelegate) {
    $scope.user = {};

    $scope.signIn = function() {
      if($scope.user.phone==""|| $scope.user.password==""){
         popup.show('提示','用户名或密码不能为空');

      }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/.test($scope.user.phone)){
        popup.show('提示','请输入正确的手机号');

      }else{
          $http({
              method:'GET',
              url:"http://localhost:3000/web/user/login",
              params:{phone:$scope.user.phone, password:$scope.user.password}
          }).success(function(rtn){
            if(rtn.issuccess) {
                $state.go('sign-up');
            }else{
                popup.show('错误',rtn.msg);
            }

          });

      }
  }
})
    .controller('SignUpCtrl',function($scope,$ionicNavBarDelegate){
            $ionicNavBarDelegate.showBackButton(true);

            $scope.goBack = function(){
                $ionicNavBarDelegate.goBack();

            }
    })

    .controller('sendMassageCtrl',function($http,$scope, $state,$ionicPopup,$timeout,popup,$ionicNavBarDelegate,serverUrl){
        scope = $scope;
        scope.popup=popup;
        $scope.user = {};
        $scope.sendMessage = function() {
            debugger;
            if($scope.user.phone==" "|| $scope.user.password==" "){
                popup.show('提示','用户名或密码不能为空');

            }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/.test($scope.user.phone)){
                popup.show('提示','请输入正确的手机号');

            }else if($scope.user.password!==$scope.user.password2) {
                popup.show('提示', '请确认两次输入的密码一致');

            }else{
                popup.show('提示','发送短信中');
                $http({
                    method:'GET',
                    url:"http://localhost:3000/web/user/forgotpassword",
                    params:{phone:$scope.user.phone, password:$scope.user.password}
                }).success(function(rtn){
                    if(rtn.issuccess) {
                        $state.go('sign-up');
                    }else{
                        debugger;
                        popup.show('错误',rtn.msg);
                    }
                });
            }
        }
    })


   



.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});