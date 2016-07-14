angular.module('chat.controllers')
    .controller('messageCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService) {
       var  socket = io.connect('http://localhost:3000');

        socket.on('receive message',function(msg){
            console.log(msg);

        });

        $scope.sendMessage = function(){
            alert('发送消息');
            socket.emit('send message','杨杰登录');
        }

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