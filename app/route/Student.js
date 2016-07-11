var Logic = require('../../config/proxy/logic/Logic');
var fs = require('graceful-fs');
var path = require('path');

class StudentLogic extends Logic {

    constructor(service) {
        super(service);
    }

    doAction(action) {
        switch (action) {
            case "login":
                return this.login;
            case "forgotpassword":
                return this.forgotpassword;
            case "register":
                return this.register;
            case "testuplpad":
            return this.testupload;
        }
    }

    async testupload(req,res){
        var result =  {state:1,issuccess:false};

   

    var filename = await   readFile();
    console.log(filename);


    }

    async login(req, res) {
        var result = {state: 1, issuccess: false};
        var {phone, password} = req.query;
        var [user] = await this.db.Student.queryStudent({phone:phone});
        if (user.password == password) {
            result.issuccess = true;
            result.data = user;
        } else {
            result.issuccess = false;
            result.msg = "密码错误";
        }
        res.json(result);
    }

    async forgotpassword(req,res){
    var result = {state:1,issuccess:false};

    }
    async register(req,res){
    var result = {state:1,issuccess:false};
    var {name,password,phone} = req.query;
    if(name&&password&&phone){
        new this.db.Student({name:name,password:password,phone:phone})
    }

    }

}

module.exports = new StudentLogic('student');
