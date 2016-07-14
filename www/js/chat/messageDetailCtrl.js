angular.module('chat.controllers')
.controller('messageDetailCtrl', ['$scope', '$stateParams',
    'messageService', '$ionicScrollDelegate', '$timeout',
    function($scope, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        // console.log("enter");
        $scope.doRefresh = function() {
            $scope.messageNum += 5;
            $timeout(function() {
                $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                    $stateParams.messageId);
                $scope.$broadcast('scroll.refreshComplete');
            }, 200);
        };




        $scope.$on("$ionicView.beforeEnter", function() {
            $scope.message = messageService.getMessageById($stateParams.messageId);
            $scope.message.noReadMessages = 0;
            $scope.message.showHints = false;
            messageService.updateMessage($scope.message);
            $scope.messageNum = 10;
            $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                $stateParams.messageId);
            $timeout(function() {
                viewScroll.scrollBottom();
            }, 0);
        });

        window.addEventListener("native.keyboardshow", function(e){
            viewScroll.scrollBottom();
        });
    }
])