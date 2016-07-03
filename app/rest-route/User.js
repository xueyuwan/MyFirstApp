var webLogic = require('../proxy/logic/WebLogic');
var mongoose = require('mongoose');
var userLogic = new webLogic('user');
var db = userLogic.db;

userLogic.doAction =function(action){
    switch(action){
        case "login":
            return login;
        case "forgotpassword":
            return forgotpassword;
        case "register":
            return register;
        case "delete":
            return deleteUser;
        defautl:
            return function(req,res){
                res.json({
                    state:0,
                    issuccess:false,
                    msg:'错误的请求'
                })
            };
    }
    function deleteUser(req,res){
        res.json({
            msg:"删除用户成功"
        });
    }

      function register(req,res) {
          var result = {state: 1, issuccess: false};
          var {username, password, phone} = req.query;
          //参数合法
          if (username && password && phone) {
              db.UserSechema.find({phone: phone}).exec(function (err, data) {
                  //已经被注册
                  if (data.length > 0) {
                      result.issuccess = false;
                      result.msg = '该手机号已被注册';
                      res.json(result);
                  }
                      //登陆成功
                  else {
                      new db.UserSechema({username: username, phone: phone, password: password}).save(function (err) {
                          if (err) console.error('error');
                      });
                      result.issuccess = true;
                      result.msg = '注册成功';
                      res.json(result);
                  }
              }
          );
            //参数不合法
          } else {
              result.issuccess=false;
              result.msg='用户名,手机,密码不能为空';
              res.json(result);
          }
      
    }

    function login(req,res){
        var result = {state:1,issuccess:false};
        var {phone,password} = req.query;
        console.log(phone+":"+password)
        if(phone&&password) {
            db.UserSechema.find({phone: phone, password: password}).exec(function(err, data){
                //可以登录
                if(data.length > 0){
                result.issuccess = true;
                result.msg = "登陆成功";
                res.json(result);
            }
        else
            {
                result.issuccess = false;
                result.msg = "用户名或密码不正确";
                res.json(result);
            }
        });
        }
        else{
            result.issuccess=false;
            result.msg="请输入用户名或者密码";
            res.json(result);
        }

    }


    function sendMessage(req,res){
        var result = {state:1,issuccess:false};
        var {phone,password} = req.query;
        if(phone) {
            db.UserSechema.find({phone: phone}).exec(function(err, data){
                //可以登录
                if(data.length <1){
                    result.issuccess = true;
                    result.msg = "该用户不存在，请重新注册";
                    res.json(result);
                }
                else
                {   new db.UserSechema({ phone: phone, password: password}).save(function (err) {
                    if (err) console.error('error');
                    });
                    result.issuccess =true;
                    result.msg = "找回密码";
                    res.json(result);
                }
            });

    }}




    function forgotpassword(req,res){
            var result = {state:1,issuccess:false};
            var {phone,password} = req.query;
            if(phone){
                db.UserSechema.findOneAndUpdate({phone:phone},{password:password}).exec(function(err,data){
                    result.issuccess=true;
                    result.msg="成功修改密码";
                    res.json(result);
                })
            }else{

                result.issuccess=false;
                result.msg="错误";
                res.json(result);
            }

    }

};

module.exports = userLogic;