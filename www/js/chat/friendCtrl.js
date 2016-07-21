angular.module('chat.controllers')
    .controller('friendsCtrl', function($rootScope,config,$http,$scope, $state) {

        $scope.showMessageDetail=function(student){
            $state.go("messageDetail", {
                "phone": student.phone
            });
        };
        $scope.onSwipeLeft = function() {
            $state.go("tab.find");
        };
        $scope.onSwipeRight = function() {
            $state.go("tab.message");
        };
        $scope.contacts_right_bar_swipe = function(e){
            console.log(e);
        };
    });
