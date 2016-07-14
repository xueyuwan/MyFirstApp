angular.module('chat.controllers', [])

.controller('findCtrl', function($scope, $state) {
    $scope.onSwipeLeft = function() {
        $state.go("tab.setting");
    };
    $scope.onSwipeRight = function() {
        $state.go("tab.friends");
    };
})



.controller('settingCtrl', function($scope, $state) {
    $scope.onSwipeRight = function() {
        $state.go("tab.find");
    };
})

