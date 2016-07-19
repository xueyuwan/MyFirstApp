var db = require('../config/auto-model');

module.exports=async function (server){
    var io = require('socket.io')(server);
    io.on('connection', function (socket){
        console.log('一位用户已经登录');
        socket.emit('new connect', '新的用户已经登录');

       //加入房间,房间号为 from+to 的手机号
       socket.on('join room',function(msg){
           //创建聊天房间

           console.log('join room:',msg.from,msg.to);
           socket.join(msg.from+msg.to);
        });

        socket.on('send message',function(msg){
            console.log('send message to room',msg.from,msg.to);
            socket.emit('receive message', msg);
        });
        socket.on('login',function(msg){
            console.log(msg);
        });
        //聊天应用程序逻辑
    });
};