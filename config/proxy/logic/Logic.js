var BaseLogic = require('../base/BaseLogic');
var fs = require('fs');
var uuid = require('node-uuid');
// var io = require('../../express').get('io');
//
// io.on('connection',function(socket){
//     socket.emit('login',{msg:'login successfully'});
// })

class Logic extends BaseLogic {
    constructor(service) {
        super();
        this.service = service;
        this.db = require('../../auto-model');
    }

    //表单提交文件,任何文件都可以,但是不能用于接收base64 的图片文件,返回uuid的文件名
    static   saveFile = async function (req) {
        return new Promise((resolve, reject) => {
                var fstream;
        req.pipe(req.busboy);

        req.busboy.on('file', function (fieldname, file, filename) {

            //Path where image will be uploaded
            fstream = fs.createWriteStream(path.join(__dirname, '..', '/upload/' + filename));
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                resolve(filename);
            });
        });
    });

    };

    //将上传的base64图片保存成本地图片并且返回uuid图片相对于www下的相对路径,和服务器的serverhost,
    static  saveBase64Image = async function(base64Data){
    return new Promise(function (resolve,reject) {
        var dataBuffer = new Buffer(base64Data, 'base64');
         filename =path.join(__dirname, '..', '/upload/base64/' + uuid.v1()+'.png');
        fs.writeFile(path.join(  filename), dataBuffer, function (err) {
                resolve(filename)
        });
    });

}

}




 module.exports = Logic;