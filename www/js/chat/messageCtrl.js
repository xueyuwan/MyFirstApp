angular.module('chat.controllers')
    .controller('messageCtrl', function(config,$rootScope,  $http,$scope, $state, $ionicPopup, socketService) {
            var socket = socketService.getSocket();


        $scope.onSwipeLeft = function() {
            $state.go("tab.friends");
        };

        $scope.showMessageDetail = function(student){
            $state.go("messageDetail", {
                "phone": student.otherPhone
            });
        };



        $scope.$on("$ionicView.beforeEnter", function(){
            socket.emit('refresh room',{phone:$rootScope.user.phone});
            $scope.popup = {
                isPopup: false,
                index: 0
            };
        });
    });