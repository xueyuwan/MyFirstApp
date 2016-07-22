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
                return this.forgotPassword;
            case "register":
                return this.register;
            case "changePersonalInformation":
                return this.changePersonalInformation;
            case "uploadheader":
            return this.uploadheader;
            case "studentlist":
                return this.getStudentList;
        }
    }
    async getStudentList(req ,res){
        var result ={state:1,isSuccess:false};
        var students = await  this.db.Student.find({}).exec();

        result.issuccess= true;
        result.data = students;
        res.json(result);
    }

    async uploadheader(req,res){
        var result =  {state:1,isSuccess:false};
        var phone = req.query.phone;
        var filename = await super.saveBase64Image(req.query.header);
         console.log(phone);
        await this.db.Student.update({phone:phone},{headPic:filename},{},function(err){
          if(err){
              console.log(err);
          }
        });

        result.data = filename;
        res.json(result);
    }


    async changePersonalInformation(req,res){

        var result =  {state:1,issuccess:false};
        var {name,phone,signature,gender,job}= req.query;
            var student = await this.db.Student.update({phone:phone},{name:name,signature:signature,gender:gender,job:job},{},function(){}).exec();
            result.data = student;
            result.issuccess = true;
            result.msg="成功修改用户信息！";

           res.json(result);

    }


    async forgotPassword(req,res){
            var result = {state:1,isSuccess:false};
            var {phone,password} = req.query;
            console.log(phone);
            var students =await this.db.Student.find({phone:phone}).exec();

            console.log(students);
            if(students.length==0){
                result.issuccess = false;
                result.msg = "错误的请求,请确认手机号";
            }else{
                var student = await this.db.Student.find({phone:phone}).update({password:password}).exec();
                result.data = student;
                result.issuccess = true;
                result.msg="成功修改密码";
            }
            res.json(result);

        }






    async login(req, res) {
        var result = {state: 1, isSuccess: false};
        var {phone, password} = req.query;
        var students =  await this.db.Student.find({phone:phone}).exec();
        if(students.length) {
            var user=students[0];
            if (user.password == password) {
                result.issuccess = true;

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



    async register(req,res){
    var result = {state:1,issuccess:false};
    var {name,password,phone,job} = req.query;
    if(name&&password&&phone&&job){
        var students =await this.db.Student.find({phone:phone});
        if(students.length){
            result.issuccess =false;
            result.msg="该手机号已经被注册";
            res.json(result);
            return ;
        }
      var  student =  await  new this.db.Student({name:name,phone:phone,password:password,job:job}).save();
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
