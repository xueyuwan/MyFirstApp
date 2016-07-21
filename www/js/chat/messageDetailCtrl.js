var messages;
var send_content;
angular.module('chat.controllers')
.controller('messageDetailCtrl',
    function(config,$rootScope,$scope,$state, $stateParams, $ionicScrollDelegate, $timeout,socketService) {
            $scope.messages =[];
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');

        var to = $state.params.phone;
        var socket = socketService.getSocket();

        socket.emit('join room',{from:$rootScope.user.phone,to:to});

        socket.emit('history message',{phone:$rootScope.user.phone,});


        $scope.sendMessage = function(){
            socket.emit('send message',{content:$scope.send_content,pic:$rootScope.user.headpic,from:$rootScope.user.phone,to:to,contentType:'text'});
            $scope.send_content=" ";
        };

        socket.on('receive message',function(msg){
         $scope.$apply(function(){
             $scope.messages.push(msg);
         });
            viewScroll.scrollBottom();
            $scope.$broadcast('scroll.refreshComplete');
        });


        $scope.$on("$ionicView.beforeEnter", function() {
            //获取消息历史
            //找到对应的房间
            var  detailRoom =  $rootScope.chatRooms.filter(function(chatRoom){
                return chatRoom.otherPhone == to;
            });
            $scope.messages = detailRoom[0].messages;

        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    });
