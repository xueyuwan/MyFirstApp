
angular.module('app.service',['ionic','ngCordova'])
    //常量
    .factory('userService',function($http,popup,config,$state,camera,imagePicker,$cordovaFile,$cordovaDialogs){
      var user={};
       user= localStorage.setItem('user');
        // $rootScope
        $state.go('app.templateyun')

      return {
        signIn: function (phone, password) {
          if ( !phone||  !password) {
              $cordovaDialogs.alert('请输入手机号或密码','提示','确定');
          } else if (!config.phoneRegex.test(phone)) {
              $cordovaDialogs.alert( '请输入正确的手机号','提示','确定');
          } else {
            $http({
              method: 'GET',
              url: config.serverUrl + "student/login",
              params: {phone: phone, password: password}
            }).success(function (rtn) {
              if (rtn.issuccess) {
                user = rtn.data;
                $state.go('app.templateyun');
                  //本地存储用户
                localStorage.setItem('user',user);
              } else {
                popup.show('提示', rtn.msg);
              }
            });
          }
        },
        signUp:function(user){
          if(!user.phone || !user.password||!user.name){
            popup.show('提示','用户名、密码或手机号不能为空');
          }else if(!config.phoneRegex.test(user.phone)) {
            popup.show('提示', '请输入正确的手机号');
          }else if(!config.passwordRegex.test(user.password)){
            popup.show('提示','密码必须是6到12位的数字加字母组成');
          }else if(!config.userNameRegex.test(user.name)){
            popup.show('提示',' 用户名必须以字母开头，长度在6~18之间');
          }else if(job.id='') {
            popup.show('提示', '请选择职业类型');
          }else{
            popup.show('提示','发送短信中');
            $http({
              method:'GET',
              url:config.serverUrl+"student/register",
              params:{name:user.name, password:user.password,phone:user.phone,job:job.id}
            }).success(function(rtn){
              if(rtn.issuccess) {
                $state.go('tab.message');
              }else{
                popup.show('错误',rtn.msg);
              }
            });
          }
        },
          forgotPassword:function(user){
              if(!user.phone||!user.password){
                  popup.show('提示','用户名或密码不能为空');
              }else if(!config.phoneRegex.test(user.phone)){
                  popup.show('提示','请输入正确的手机号');
              }else if(!config.passwordRegex.test(user.password)){
                  popup.show('提示','密码必须是6到12位的数字加字母组成');
              }else if(job.id='') {
                  popup.show('提示', '请选择职业类型');
              }else{
                  popup.show('提示','发送短信中');
                  $http({
                      method:'GET',
                      url:config.serverUrl+"student/forgotpassword",
                      params:{phone:user.phone, password:user.password}
                  }).success(function(rtn){
                      if(rtn.issuccess) {
                          $state.go('sign-up');
                      }else{
                          popup.show('错误',rtn.msg);
                      }
                  });
              }
          },
          getLocalUser:function(){
              user = localStorage.getItem('user');
              return user;
          },
          viewHeader :function(scope){
                $state.go('intro');
          },
          cameraHeader:function($scope){
              camera(function(base64Data){
                  $scope.userHeader = "data:image/jpeg;base64,"+base64Data;
                  alert($scope.userHeader);
                  $http.save(
                      {
                          url:config.serverUrl+'test/testuploadbase64',
                          params:{
                              base64:$scope.userHeader
                          }
                      }
                  ).success(function(rtn){
                    alert(rtn);
                  })
              });


          },
          pickImageHeader:function($scope){
              imagePicker.pickOne(function(urls){
                  $scope.userHeader =urls[0];
              })

    }
      }
    })
    .factory('templateService',function($http){
      return {
    //返回模板库
          initData: $http({
                  method: 'get',
                  url: 'http://localhost:3000/demos.json'
              }).error(function (err) {
                  console.error(err);
              }),
          initTemplate: function(config) {

          }

      }

    });
