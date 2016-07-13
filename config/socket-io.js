

module.exports=async function (server){
    var io = require('socket.io')(server);
    io.on('connection', function (socket){
        console.log('一位用户已经登录');
        socket.emit('new connect', '新的用户已经登录');
        socket.on('send message',function(msg){
            socket.broadcast.emit('receive message',msg);
        });
        socket.on('login',function(msg){
            console.log(msg);
        });
        //聊天应用程序逻辑
    });
};