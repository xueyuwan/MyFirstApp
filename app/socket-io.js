var moment = require('moment');

module.exports = async function (server){
    var db = require('../config/auto-model');
    var io = require('socket.io')(server);
    io.on('connection', function (socket){
        console.log('一位用户已经登录');
        socket.emit('new connect', '新的用户已经登录');

       //加入房间,房间号为 from+to 的手机号
       socket.on('join room',function(msg){
           //创建聊天房间
           console.log('join room:',msg.from,msg.to);
            var room = [msg.from,msg.to].sort();
           socket.join(room.toString());
        });

        socket.on('send message',async function(msg){
            console.log('send message to room',msg.from,msg.to);
            //socket放在最上面，便于用户快速响应聊天结果
            socket.emit('receive message', msg);

            //查询是否有两人的聊天室,若有,则将该消息存入聊天室,若没有,则创建两人的聊天室,
            var people = [msg.from,msg.to].sort();
                    var [chatRoom] = await  db.chatRoom.find({people:people}).exec();


                    //若没有该聊天室,则创建新的聊天室,并将消息打入聊天室
                    if (!chatRoom) {
                        await new db.chatRoom({
                            people: people,
                            messages: [{from: msg.from, to: msg.to, content: msg.content, contentType: msg.contentType}],
                            lastMessage:{content:msg.content}
                        }).save();
                    }else {
                        //若有聊天室,则将消息打入聊天室
                        // console.log(typeof chatRoom.createDt);
                        console.log(chatRoom.createDt.toLocaleString());
                        chatRoom.messages.push({
                            from: msg.from,
                            to: msg.to,
                            content: msg.content,
                            contentType: msg.contentType
                        });
                        await  db.chatRoom.update({_id: chatRoom._id}, chatRoom, {}, function (err) {
                            if(err)console.error(err);
                        });
                    }




        });
        socket.on('login',function(msg){
            console.log(msg);
        });
        //聊天应用程序逻辑
    });
};