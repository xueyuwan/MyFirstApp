angular.module('chat.controllers', [])

.controller('findCtrl', function($scope, $state) {
    $scope.onSwipeLeft = function() {
        $state.go("tab.setting");
    };
    $scope.onSwipeRight = function() {
        $state.go("app.tab.friends");
    };
})
.controller('settingCtrl', function($scope, $state) {
    $scope.onSwipeRight = function() {
        $state.go("tab.find");
    };
})


    //聊天框
    .controller('chatCtrl',function($rootScope,$scope,$state,config,socketService){
        var socket =socketService.getSocket();
        socket.emit('refresh room',{phone:$rootScope.user.phone});
        socket.emit('refresh students',{phone:$rootScope.user.phone});

        socket.on('refresh room',function(data){
            $rootScope.$apply(function(){
                console.log('chat Rooms '+data);
                $rootScope.chatRooms = data;
            });
        });
        socket.on('refresh students',function(data){
           $rootScope.$apply(function(){
               console.log(data);
               $rootScope.students = data;
           });
        });
    });





