angular.module('chat.controllers')
    .controller('messageCtrl', function(config,$rootScope,  $http,$scope, $state, $ionicPopup, socketService) {
            var socket = socketService.getSocket();


        $scope.onSwipeLeft = function() {
            $state.go("tab.friends");
        };

        $scope.showMessageDetail = function(chatRoom){
            $state.go("messageDetail", {
                "phone": chatRoom.talkTo.phone
            });
        };



        $scope.$on("$ionicView.beforeEnter", function(){
            socket.emit('refresh room',{phone:$rootScope.user._id});
            $scope.popup = {
                isPopup: false,
                index: 0
            };
        });
    });