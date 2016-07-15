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
            case "uploadheader":
            return this.uploadheader;
            case "studentlist":
                return this.getStudentList;
        }
    }
    async getStudentList(req,res){
        var result ={state:1,issuccess:false};
        var students = await  this.db.Student.find({}).exec();
        for (var i in students) {
                students[i].headpic = super.config().serverUrl + students[i].headpic;
        };

        result.issuccess= true;
        result.data = students;
        res.json(result);
    }

    async uploadheader(req,res){
        var result =  {state:1,issuccess:false};
        var phone = req.query.phone;
        var filename = await super.saveBase64Image(req.query.header);
         console.log(phone);
        await this.db.Student.update({phone:phone},{headpic:filename},{},function(err){
          if(err){
              console.log(err);
          }
        });

        result.data = super.config().serverUrl+filename;
        res.json(result);
    }

    async login(req, res) {
        var result = {state: 1, issuccess: false};
        var {phone, password} = req.query;

        var students =  await this.db.Student.find({phone:phone}).exec();
        if(students.length) {
            var user=students[0];
            if (user.password == password) {
                result.issuccess = true;
                //修改user头像前缀
                user.headpic = super.config().serverUrl+user.headpic;

                result.data = user;
            } else {
                result.issuccess = false;
                result.msg = "密码错误";
            }
        }else{
            result.issuccess=false;
            result.msg="该用户不存在";

        }

        res.json(result);

    }

    async forgotpassword(req,res){
    var result = {state:1,issuccess:false};
    var {phone,password} = req.query;
console.log(phone);
        var students =await this.db.Student.find({phone:phone}).exec();

        console.log(students);
        if(students.length==0){
            result.issuccess = false;
            result.msg = "错误的请求";
        }else{
           var student = await this.db.Student.find({phone:phone}).update({password:password}).exec();
            result.issuccess = true;
            result.msg="成功修改密码";
        }
        res.json(result);

    }


    async register(req,res){
    var result = {state:1,issuccess:false};
    var {name,password,phone} = req.query;
    if(name&&password&&phone){
        var students =await this.db.Student.find({phone:phone});
        if(students.length){
            result.issuccess =false;
            result.msg="该手机号已经被注册";
            res.json(result);
            return ;
        }
      var  student =  await  new this.db.Student({name:name,phone:phone,password:password}).save();
        result.issuccess=true;
        result.msg="注册成功";
        result.data = student;

    } else{
        result.issuccess=false;
        result.msg="信息不完整";
    }
    res.json(result);
    }
}

module.exports = new StudentLogic('student');
