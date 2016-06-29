var webLogic = require('../proxy/logic/WebLogic');
var mongoose = require('mongoose');
var userLogic = new webLogic('user');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);


var db = userLogic.db;

userLogic.doAction =function(action){
    switch(action){
        case "login":
            return login;
        case "forgotpassword":
            return forgotpassword;
        case "register":
            return register;
    }
      function register(req,res)
    {


        console.log('sadasd');
        db.UserSechema.find({}).exec().then(doc=>{
            return doc;
        }).then(doc=>{
        db.UserSechema.find({}).exec().then(doc2=>{
        doc2[10]=doc;
        res.send(doc2);
    })
    });
    }

    function login(req){
        var result = {
            state:0,
            issuccess:false,
            msg:"非法的登录"
        };
        return result;
    }

    function forgotpassword(req,res){
        res.send("forgot password successfully");
    }

};

//
// var UserSechema = new Schema({
//     firstName : String,
//     lastName : String,
//     email : String,
//     username : String,
//     password : String
// });

// userLogic.doAction('register')();

module.exports = userLogic;








