angular.module('chat.controllers')
    .controller('friendsCtrl', function($rootScope,config,$http,$scope, $state) {
        $http({
            method:'POST',
            url:config.serverUrl+'student/studentlist'
        }).success(function(rtn){
            $scope.students = rtn.data;
            //实习生按升序排列
            $scope.students.sort(function(a,b){
                return  a.name.localeCompare(b.name);
            });
                $rootScope.students=rtn.data;
                console.log($scope.students);
        });


        $scope.showMessageDetail=function(student){
            $state.go("messageDetail", {
                "phone": student.phone
            });
        };
        $scope.onSwipeLeft = function() {
            $state.go("tab.find");
        };
        $scope.onSwipeRight = function() {
            $state.go("tab.message");
        };
        $scope.contacts_right_bar_swipe = function(e){
            console.log(e);
        };
    });
