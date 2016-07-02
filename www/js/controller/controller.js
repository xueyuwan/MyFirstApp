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
    }) .controller('menuCtrl',function($scope,camera,$ionicActionSheet,$timeout){
    $scope.changeHeader = function(){

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<b>预览</b> ' },
                { text: '拍照' },
                {text:'图库选取'}
            ],
            titleText: '<h3>头像</h3>',
            cancelText: '取消',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                   alert(index);

                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);
        /*
        camera(function(imageUrl){

            $scope.userHeader="data:image/jpeg;base64," +imageUrl;

        });
        */
    }
});