angular.module('app.controller',[])
.controller('SignInCtrl', function($http,$scope, $state,$ionicPopup,$timeout,popup,$ionicNavBarDelegate,userService) {
    $scope.user = {};
    $scope.autoSign = function(){

    };
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
            destructiveButtonClicked:function(){
             alert('destructive');
                return true
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