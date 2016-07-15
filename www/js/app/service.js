
angular.module('app.service',['ionic','ngCordova'])
    //常量
    .factory('userService',function($http,$rootScope,popup,config,$state,camera,imagePicker,$cordovaFile,$cordovaDialogs){
      // var user={};
      //  user= localStorage.setItem('user');
      //   alert( user);
       //  $rootScope.phone=user.phone;
       //  $rootScope.password=user.password;
       //  $state.go('app.templateyun')

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
                // localStorage.setItem('phone',user.phone);
                $rootScope.user= user;
              } else {
                popup.show('提示', rtn.msg);
              }
            });
          }
        },
        signUp:function(user){
            console.log(user.job);
          if(!user.phone || !user.password||!user.name){
            popup.show('提示','用户名、密码或手机号不能为空');
          }else if(!config.phoneRegex.test(user.phone)) {
            popup.show('提示', '请输入正确的手机号');
          }else if(!config.passwordRegex.test(user.password)){
            popup.show('提示','密码必须是6到12位的数字加字母组成');
          }else if(user.job==''){
              popup.show('提示','请选择职业类型');
          }else{
            popup.show('提示','发送短信中');
            $http({
              method:'GET',
              url:config.serverUrl+"student/register",
              params:{name:user.name, password:user.password,phone:user.phone,job:user.job}
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
              }else{
                  popup.show('提示','发送短信中');
                  $http({
                      method:'GET',
                      url:config.serverUrl+"student/forgotpassword",
                      params:{phone:user.phone, password:user.password}
                  }).success(function(rtn){
                      if(rtn.issuccess) {
                          $state.go('sign-in');
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
              camera(function(base64Data) {
                  $http({
                      method:'POST',
                      url:config.serverUrl+'student/uploadheader',
                      params:{
                          phone:$rootScope.user.phone,
                          header:base64Data
                      }
                  }).success(function(rtn){
                        $rootScope.user.headpic= rtn.data;
                  });

              });
          },
          pickImageHeader:function($scope){
              imagePicker.pickOne(function(urls){
                  var header = urls[0];
                  alert(header);
                 $http({
                     method:'POST',
                     url:config.serverUrl+'student/uploadheader',
                     params:{
                         phone:$rootScope.user.phone,
                         header:header
                     }
                 }).success(function(data){
                     $rootScope.headpic=rtn.data;
                 })
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
