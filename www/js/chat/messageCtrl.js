angular.module('chat.controllers')
    .controller('messageCtrl', function(config,$http,$scope, $state, $ionicPopup, localStorageService, messageService) {
       var  socket = io.connect(config.serverUrl);
        $http({
            method:'POST',
            url:config.serverUrl+'student/studentlist'
        }).success(function(rtn){
            $scope.students = rtn.data;
        });


        socket.on('receive message',function(msg){
            console.log(msg);
        });



        $scope.onSwipeLeft = function() {
            $state.go("tab.friends");
        };
        $scope.messageDetils = function(message) {
            $state.go("messageDetail", {
                "messageId": message.id
            });
        };

        $scope.$on("$ionicView.beforeEnter", function(){
            console.log($scope.messages);
            $scope.messages = messageService.getAllMessages();
            $scope.popup = {
                isPopup: false,
                index: 0
            };
        });

    })