var messages;
var send_content;
angular.module('chat.controllers')
.controller('messageDetailCtrl',
    function(config,$rootScope,$scope,$state, $stateParams, $ionicScrollDelegate, $timeout,socketService) {
            $scope.chatRoom ={
                messages:[]
            };
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        var talkTo = $state.params.phone;
        var socket = socketService.getSocket();
        socket.emit('join room',{from:$rootScope.user.phone,to:talkTo});
        socket.emit('student information',{phone:talkTo});

        socket.on('student information',function(student){
            $scope.$apply(function() {
                $scope.talkToStudent = student;
                console.log($scope.talkToStudent);
            });
        });

        $scope.sendMessage = function(){
            socket.emit('send message',{content:$scope.send_content,from:$rootScope.user._id,to:$scope.chatRoom.talkTo._id,contentType:'text'});
            $scope.send_content=" ";
        };

        socket.on('receive message',function(msg){
         $scope.$apply(function(){
             $scope.chatRoom.messages.push(msg);
         });
            viewScroll.scrollBottom();
            $scope.$broadcast('scroll.refreshComplete');
        });


        $scope.$on("$ionicView.beforeEnter", function() {
            //获取消息历史
            //找到对应的房间

                // $scope.chatRoom = $rootScope.chatRooms.find(function(chatRoom){
                //     return  chatRoom.talkTo.phone == talkTo;
                // });


        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    });
