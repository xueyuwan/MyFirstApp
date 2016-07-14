var messages;
angular.module('chat.controllers')
.controller('messageDetailCtrl',
    function($rootScope,$scope, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
            $scope.messages =[];
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        messages =$scope.messages;
        var socket = io.connect('http://localhost:3000/');
        $scope.sendMessage = function(){
            socket.emit('send message',$scope.send_content);
            $scope.messages.push({content:$scope.send_content,pic:$rootScope.user.headpic,isFromeMe:true});
            console.log($scope.messages);
            $scope.send_content="";
        };

        $scope.doRefresh = function() {
            $scope.messageNum += 5;
            $timeout(function() {
                $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                    $stateParams.messageId);
                $scope.$broadcast('scroll.refreshComplete');
            }, 200);
        };
        $scope.$on("$ionicView.beforeEnter", function() {

        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    });
