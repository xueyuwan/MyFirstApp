var messages;
var send_content;
angular.module('chat.controllers')
.controller('messageDetailCtrl',
    function(config,$rootScope,$scope, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
            $scope.messages =[];
        send_content =$scope.send_content;
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        messages =$scope.messages;
        var socket = io.connect(config.serverUrl);
        $scope.sendMessage = function(){
            socket.emit('send message',{content:$scope.send_content,pic:$rootScope.user.headpic,isFromeMe:true});
            $scope.send_content=" ";
        };
        socket.on('receive message',function(msg){
         $scope.messages.push(msg);
            viewScroll.scrollBottom();
            $scope.$broadcast('scroll.refreshComplete');
        });

        // $scope.doRefresh = function() {
        //     $scope.messageNum += 5;
        //     $timeout(function() {
        //         $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
        //             $stateParams.messageId);
        //         $scope.$broadcast('scroll.refreshComplete');
        //     }, 200);
        // };
        $scope.$on("$ionicView.beforeEnter", function() {

        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    });
