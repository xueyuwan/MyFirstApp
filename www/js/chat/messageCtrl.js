angular.module('chat.controllers')
    .controller('messageCtrl', function(config,$rootScope,  $http,$scope, $state, $ionicPopup, localStorageService, messageService) {
       var  socket = io.connect(config.serverUrl);

        //长轮询做
        $http({
            method:'GET',
            url:config.serverUrl+'chat/listChatRoom',
            params:{phone:$rootScope.user.phone}
        }).success(function(rtn){

                $rootScope.chatRooms = rtn.data;

        });


        socket.on('receive message',function(msg){
            console.log(msg);
        });



        $scope.onSwipeLeft = function() {
            $state.go("tab.friends");
        };
        $scope.messageDetils = function(student) {
            $state.go("messageDetail", {
                "phone": student.phone
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
    });