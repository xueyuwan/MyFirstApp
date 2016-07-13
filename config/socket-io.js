

module.exports=async function (server){
    var io = require('socket.io')(server);
    var connect =async function(server) {
        return  new Promise(function(resolve,reject){
            io.on('connection', function (socket) {

                socket.emit('login', '登陆成功');
                resolve(socket);
            });
        });
    };
    //聊天应用程序逻辑
    var socket = await  connect(server);
    socket.emit('login','登录成功');

    return socket;
};