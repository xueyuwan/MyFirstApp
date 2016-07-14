angular.module('chat.controllers')
    .controller('friendsCtrl', function(config,$http,$scope, $state) {
        $http({
            method:'POST',
            url:config.serverUrl+'student/studentlist'
        }).success(function(rtn){
            var students = rtn.data;
                console.log(students);
        });

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
