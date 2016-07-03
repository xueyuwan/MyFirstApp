angular.module('app.controller',[])
.controller('SignInCtrl', function($http,$scope, $state,$ionicPopup,$timeout,popup,$ionicNavBarDelegate,userService) {
    $scope.user = {};
    //如果用户已经登陆,则自动跳转到用户主页,利用localStorage来做
    $scope.$on("$ionicView.beforeEnter", function(){
        userService.getLocalUser()?$state.go('app.message'):"";
    });
    $scope.signIn = function() {
        userService.signIn($scope.user.phone, $scope.user.password);
    }
    })
    .controller('SignUpCtrl',function($scope,$state,userService){
        $scope.user = {};
        $scope.signUp = function() {
            userService.signUp($scope.user.phone,$scope.user.password,$scope.user.password2);
        }


    })

    .controller('forgotPasswordCtrl',function($scope,userService){
        $scope.user = {};
        $scope.forgotPassword = function() {
           userService.forgotPassword();
        }
    })
    .controller('HomeTabCtrl', function($scope) {
        console.log('HomeTabCtrl');
    })
    .controller('menuCtrl',function($scope,camera,$ionicActionSheet,$ionicSlideBoxDelegate,userService){
    $scope.changeHeader = function(){

        // Called to navigate to the main app
        $scope.startApp = function() {
            $state.go('main');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };




        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<b>预览</b> ' },
                { text: '拍照' },
                {text:'从相册选取'},
            ],
            titleText: '<h3>头像</h3>',
            cancelText: '取消',
            buttonClicked: function(index) {
                 switch (index){
                     case 0:
                         userService.viewHeader($scope);
                         return true;
                     case 1:
                         userService.cameraHeader($scope);
                        return true;
                     case 2:
                         userService.pickImageHeader($scope);
                    return true;
                 }

                return true;
            }
        });

    }
});