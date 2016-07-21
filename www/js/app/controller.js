
var socket;
angular.module('app.controller',[])
.controller('SignInCtrl', function($http,$scope,$rootScope, $state,$ionicPopup,$timeout,popup,$ionicNavBarDelegate,userService) {
    $scope.user = {};
     // user = localStorage.getItem('user');

    //如果用户已经登陆,则自动跳转到用户主页,利用localStorage来做
    // $scope.$on("$ionicView.beforeEnter", function(){
    //     userService.getLocalUser()?$state.go('app.message'):"";
    // });
    $scope.signIn = function() {
        userService.signIn($scope.user.phone, $scope.user.password);
    }
    })
    .controller('SignUpCtrl',function($scope,$state,userService){
        $scope.user = {};
        $scope.signUp = function() {
            userService.signUp($scope.user);
        }
        $scope.jobs = [
            "网页设计师",
            "前端工程师",
            "PHP工程师",
            "实习生",
            "讲师",
            "管理人员",
            "行政人员",
            "其他"
        ]
    })
    .controller('forgotPasswordCtrl',function($scope,userService){
        $scope.user = {};
        $scope.forgotPassword = function() {
           userService.forgotPassword($scope.user);
        }
    })
    .controller('HomeTabCtrl', function($scope) {
        console.log('HomeTabCtrl');
    })

    .controller('tabFriendsCtrl', function($scope, $state) {
        $scope.$state = function() {
            $state.go("menu2.tab-message");
        };
    })

    .controller('tabMessageCtrl', function($scope, $state) {
        $scope.$state = function() {
            $state.go("menu2.tab-friends");
        };
    })
    .controller('SettingCtrl', function($scope,$ionicPopover,$timeout,$ionicModal,userService,$rootScope,$state) {
        // userService.signIn={"15671624774","www123"};
        // $rootScope.user={};
        $scope.user = {};
        $scope.changePersonalInformation = function() {
            userService.changePersonalInformation($scope.user);
        }

        $scope.exit=function(){
            $state.go("sign-in");

        }

        //头像预览弹窗
        // $scope.popover = $ionicPopover.fromTemplateUrl('setting2.html', {
        //     scope: $scope
        // });
        // // .fromTemplateUrl() 方法
        // $ionicPopover.fromTemplateUrl('setting2.html', {
        //     scope: $scope
        // }).then(function(popover) {
        //     $scope.popover = popover;
        // });
        // $scope.openPopover = function($event) {
        //     $scope.popover.show($event);
        // };
        // $scope.closePopover = function() {
        //     $scope.popover.hide();
        // };
        // // 清除浮动框
        // $scope.$on('$destroy', function() {
        //     $scope.popover.remove();
        // });




        //个人信息设置
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.createContact = function(u) {
            $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
            $scope.modal.hide();
        };


      //头像设置
        $ionicModal.fromTemplateUrl('templates/headpic.html', {
            scope: $scope
        }).then(function(headpic) {
            $scope.headpic = headpic;
        });

        $scope.createContact = function(u) {
            $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
            $scope.headpic.hide();
        };


      //关于我们设置
        $ionicModal.fromTemplateUrl('templates/aboutus.html', {
            scope: $scope
        }).then(function(aboutus) {
            $scope.aboutus = aboutus;
        });

        $scope.createContact = function(u) {
            $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
            $scope.aboutus.hide();
        };




        $scope.shouBigHeadoic = function (imageName) {  //传递一个参数（图片的URl）
            $scope.Url = imageName;                   //$scope定义一个变量Url，这里会在大图出现后再次点击隐藏大图使用
            $scope.bigImage = true;                   //显示大图
        };

        $scope.bigImage = false;    //初始默认大图是隐藏的
        $scope.hideBigImage = function () {
            $scope.bigImage = false;
        };




        //
        // $ionicModal.fromTemplateUrl('templates/modal.html', {
        //     scope: $scope
        // }).then(function(modal) {
        //     $scope.modal = modal;
        // });
        //
        // $scope.createContact = function(u) {
        //     $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        //     $scope.modal.hide();
        // };

        //
        $scope.jobs = [
            "网页设计师",
            "前端工程师",
            "PHP工程师",
            "实习生",
            "讲师",
            "管理人员",
            "行政人员",
            "其他"
        ]

        $scope.clientSideList = [
            { text: "男", value: "男" },
            { text: "女", value: "女" }

        ];
        $scope.user = {
            gender: '女'
        };


    })

    .controller('NotificationCtrl', function($scope, $ionicBackdrop, $timeout) {
        $scope.shouBigImage = function (imageName) {  //传递一个参数（图片的URl）
            $scope.Url = imageName;                   //$scope定义一个变量Url，这里会在大图出现后再次点击隐藏大图使用
            $scope.bigImage = true;
            // $ionicBackdrop.retain();
            // $timeout(function() {
            //         $ionicBackdrop.release();
            // }, 1000);
            //显示大图
        };

        $scope.bigImage = false;    //初始默认大图是隐藏的
        $scope.hideBigImage = function () {
            $scope.bigImage = false;
        };

        
    })

    .controller('menuCtrl',function($scope,camera,$ionicActionSheet,config,$ionicSlideBoxDelegate,userService){
        $scope.changeHeader = function(){
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
            // .controller('tabMessageCtrl', function($scope, $stateParams, Chats) {
            //     $scope.chat = Chats.get($stateParams.chatId);
            // })
            //
            // .controller('tabFriendCtrl', function($scope, Friends) {
            //     $scope.friends = Friends.all();
            // });
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<b>预览</b> ' },
                { text:  "拍照" },
                {text:'从相册选取'},
            ],
            titleText: '<h3>头像</h3>',
            cancelText: '取消',
            buttonClicked: function(index) {
                 switch (index){
                     case 0:
                         userService.viewHeader($scope);
                         return true;
                     case 1:
                         userService.cameraHeader($scope);
                        return true;
                     case 2:
                         userService.pickImageHeader($scope);
                    return true;
                 }
                return true;
            }
        });

    };
})


    .controller('TemplateYun',function($scope,$state,$http,$rootScope,templateService,$cordovaInAppBrowser){
        templateService.initData.success(function(rtn){
            $rootScope.demos = rtn.demos;
        });

        $scope.viewTemplate = function(demo){
            $rootScope.currentDemoConfig =demo.config ;
            $rootScope.currentDemoTitle=demo.title;
            // $state.go('templateIndex');
        };
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        $scope.open =function(url) {
            $cordovaInAppBrowser.open(url, '_blank', options)
                .then(function (event) {
                    //监听回退键
                })
                .catch(function (event) {
                    //
                });
        }

    })
    .controller('TemplateIndex',function($scope,$state,$http,$rootScope,$stateParams,config,$cordovaInAppBrowser){



        /*
                    $http({
                        method:'get',
                        url:config.serverUrl+$rootScope.currentDemoConfig
                    }).success(function(rtn){
                        $rootScope.header=config.serverUrl+ rtn.header.url;
                        $rootScope.footer=config.serverUrl+ rtn.footer.url;

                        for(loop = 0; loop < rtn.pages.length; loop++){
                            currentRoute = rtn.pages[loop];
                            $stateProviderReference.state('templateIndex.'+currentRoute.name, {
                                url:currentRoute.name,
                                templateUrl:config.serverUrl +currentRoute.url
                            });
                        }
                        // $stateProviderReference.reload();
                        $rootScope.templateTitle=
                         $state.go('templateIndex.index', {}, {reload: false});

                    }).error(function(err){
                        alert(err);
                    });
        */
});