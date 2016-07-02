angular.module('wechat.controller',[])
    .controller('wechat-find-ctrl',function($scope,$state){
        $scope.onSwipeRight = function(){
            $state.go('wechat-tab.friends');
        }
        $scope.onSwipeLeft = function(){
            $state.go('wechat-tab.setting');
        }
    })
.controller('wechat-message-ctrl',function($state,$scope,$ionicPopup,localStorageService,messageService){
    //从右向左滑动的时候,到第二个页面
    console.log('messageCtrl');
    $scope.onSwipeLeft = function(){
        $state.go('wechat-tab.friends');
    };

    $scope.popupMessageOpthins =function(message){
        $scope.popup.index = $scope.messages.indexOf(message);
        $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/popup.html",
            scope: $scope   //把scope传进去,且开始定义标记已读,置顶,删除,等函数放进去
        });
    };

    $scope.markMessage = function() {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.showHints) {
            message.showHints = false;
            message.noReadMessages = 0;
        } else {
            message.showHints = true;
            message.noReadMessages = 1;
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
    };
    $scope.deleteMessage = function() {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        $scope.messages.splice(index, 1);
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.deleteMessageId(message.id);
        messageService.clearMessage(message);
    };
    $scope.topMessage = function() {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.isTop) {
            message.isTop = 0;
        } else {
            message.isTop = new Date().getTime();
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
    };
    $scope.messageDetils = function(message) {
        $state.go("wechat-messageDetail", {
            "messageId": message.id
        });
    };

    $scope.$on("$ionicView.beforeEnter", function(){
        console.log("enter ");
        console.log($scope.messages);
        $scope.messages = messageService.getAllMessages();
        $scope.popup = {
            isPopup: false,
            index: 0
        };
    });
})
    .controller('wechat-detail-ctrl',['$scope', '$stateParams',
        'messageService', '$ionicScrollDelegate', '$timeout',
        function($scope,$stateParams,messageService,$ionicScrollDelegate,$timeout){
            var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
            // console.log("enter");
            $scope.doRefresh = function() {
                // console.log("ok");
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
    }])
    .controller('wechat-friends-ctrl',function($scope,$state){
        $scope.onSwipeRight = function(){
            $state.go('wechat-tab.message');
        }
        $scope.onSwipeLeft = function(){
            $state.go('wechat-tab.find');
        }
    })
    .controller('wechat-setting-ctrl',function($scope,$state){
      $scope.onSwipeRight=function(){
          $state.go('wechat-tab.find');
      }
    });




