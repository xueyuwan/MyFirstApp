var Logic = require('../proxy/logic/Logic');

class UserLogic extends Logic {
    constructor(service){
        super(service);
    }

    doAction (action) {
        switch (action) {
            case "login":
                return this.login;
            case "forgotpassword":
                return this.forgotpassword;
            case "register":
                return this.register;
        }
    }


         register(req, res) {
            var result = {state: 1, issuccess: false};
            var {username, password, phone} = req.query;
            //参数合法
            if (username && password && phone) {
                //参数不合法
                // res.
            } else {
                result.issuccess = false;
                result.msg = '用户名,手机,密码不能为空';
                res.json(result);
            }

        }

         login(req, res) {
            var result = {state: 1, issuccess: false};
                // console.log(this);
                console.log(req.query);
            var {phone, password} = req.query;


            if (phone && password) {
                // console.log(this.db);
                this.db.UserSechema.findUserByPhone(phone, password).then(function (err, data) {
                    console.log(err + ':' + data);
                    //可以登录
                    if (data.length > 0) {
                        result.issuccess = true;
                        result.msg = "登陆成功";
                        res.json(result);
                    }
                    else {
                        result.issuccess = false;
                        result.msg = "用户名或密码不正确";
                        res.json(result);
                    }
                });
            }
            else {
                result.issuccess = false;
                result.msg = "请输入用户名或者密码";
                res.json(result);
            }
        }


         sendMessage(req, res) {
            var result = {state: 1, issuccess: false};
            var {phone, password} = req.query;
            if (phone) {

                this.db.UserSechema.find({phone: phone}).exec(function (err, data) {
                    //可以登录
                    if (data.length < 1) {
                        result.issuccess = true;
                        result.msg = "该用户不存在，请重新注册";
                        res.json(result);
                    }
                    else {
                        new db.UserSechema({phone: phone, password: password}).save(function (err) {
                            if (err) console.error('error');
                        });
                        result.issuccess = true;
                        result.msg = "找回密码";
                        res.json(result);
                    }
                });
            }
        }


         forgotpassword(req, res) {
            var result = {state: 1, issuccess: false};
            var {phone, password} = req.query;
            if (phone) {
                db.UserSechema.findOneAndUpdate({phone: phone}, {password: password}).exec(function (err, data) {
                    result.issuccess = true;
                    result.msg = "成功修改密码";
                    res.json(result);
                })
            } else {

                result.issuccess = false;
                result.msg = "错误";
                res.json(result);
            }
        }
    }



module.exports = new UserLogic('user');
