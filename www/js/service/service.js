angular.module('app.service',[])
    //常量
    .factory('config',function(){
      return {
        serverUrl:'http://localhost:3000',
          phoneRegex:/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/,
          passwordRegex:/^[a-zA-Z]\w{5,17}$/,
          userNameRegex:/^[a-zA-Z]\w{5,17}$/
      }
    })

    .factory('userService',function($http,popup,config,$state,camera,imagePicker,$cordovaFile){
      var user={};
      return {
        signIn: function (phone, password) {
          if ( !phone||  !password) {
            popup.show('提示', '用户名或密码不能为空');
          } else if (!config.phoneRegex.test(phone)) {
            popup.show('提示', '请输入正确的手机号');
          } else {
            // $http({
            //   method: 'GET',
            //   url: config.serverUrl + "/web/user/login",
            //   params: {phone: phone, password: password}
            // }).success(function (rtn) {
            //   if (rtn.issuccess) {
            //     user = rtn.data;
                $state.go('app.message')
              // } else {
              //   popup.show('提示', rtn.msg);
              // }
            // });
          }
        },
        signUp:function(phone,password,password2){
          if(phone==" "|| password==" "||name==""){
            popup.show('提示','用户名、密码或手机号不能为空');
          }else if(!config.phoneRegex.test(phone)) {
            popup.show('提示', '请输入正确的手机号');
          }else if(!config.passwordRegex.test(password)){
            popup.show('提示','密码必须是6到12位的数字加字母组成');
          }else if(!config.userNameRegex.test(name)){
            popup.show('提示',' 用户名必须以字母开头，长度在6~18之间');
          }else if(password!==password2) {
            popup.show('提示', '请确认两次输入的密码一致');
          }else{
            popup.show('提示','发送短信中');
            $http({
              method:'GET',
              url:config.serverUrl+"/user/register",
              params:{name:name, password:password,phone:phone}
            }).success(function(rtn){
              if(rtn.issuccess) {
                $state.go('sign-in');
              }else{
                popup.show('错误',rtn.msg);
              }
            });
          }
        },
          forgotPassword:function(phone,password,password2){
              if(!phone||!password){
                  popup.show('提示','用户名或密码不能为空');
              }else if(!config.phoneRegex.test(phone)){
                  popup.show('提示','请输入正确的手机号');
              }else if(!config.passwordRegex.test(password)){
                  popup.show('提示','密码必须是6到12位的数字加字母组成');
              }else if(password!==password2) {
                  popup.show('提示', '请确认两次输入的密码一致');
              }else{
                  popup.show('提示','发送短信中');
                  $http({
                      method:'GET',
                      url:config.serverUrl+"/web/user/forgotpassword",
                      params:{phone:phone, password:password}
                  }).success(function(rtn){
                      if(rtn.issuccess) {
                          $state.go('sign-up');
                      }else{
                          debugger;
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
              camera(function(imageUrl){
                  $scope.userHeader="data:image/jpeg;base64," +imageUrl;
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
          initTemplate: (function(config){
              return $http({
                  method:'get',
                url:'http://localhost:3000/'+config
              });
          })(config)

      }

    });
