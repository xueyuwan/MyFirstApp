var messages;
var send_content;
angular.module('chat.controllers')
.controller('messageDetailCtrl',
    function(config,$rootScope,$scope,$state, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
            $scope.messages =[];
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');

        var to = $state.params.phone;

        var socket = io.connect(config.serverUrl);

        $scope.sendMessage = function(){
            socket.emit('send message',{content:$scope.send_content,pic:$rootScope.user.headpic,frome:$rootScope.user.phone,to:to});
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
        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    });
