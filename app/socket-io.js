var moment = require('moment');

module.exports = async function (server){
    var db = require('../config/auto-model');
    var io = require('socket.io')(server);
    io.on('connection', function (socket){
        console.log('一位用户已经登录');

        //加入房间,房间号为 from+to 的手机号
        socket.on('join room',joinRoom(socket,db));
        socket.on('send message',sendMessage(socket,db));
        socket.on('refresh room',refreshRoom(socket,db));
        socket.on('refresh students',refreshFriends(socket,db));



    });
};


var joinRoom = function(socket,db){
    return async function(msg){
            //创建聊天房间
            console.log('join room:',msg.from,msg.to);
            socket.join(msg.from+msg.to);

        }
};




var sendMessage =  function(socket,db){

    return  async function(msg){
        console.log('send message to room',msg.from,msg.to);
        //socket放在最上面，便于用户快速响应聊天结果
        socket.emit('receive message', msg);
        //查询是否有两人的聊天室,若有,则将该消息存入聊天室,若没有,则创建两人的聊天室,
        var people = [msg.from,msg.to].sort();
        var [chatRoom] = await  db.chatRoom.find({people:people}).exec();
        //若没有该聊天室,则创建新的聊天室,并将消息打入聊天室
        if (!chatRoom) {
            console.log('创建房间');
            await new db.chatRoom({
                people: people,
                messages: [{from: msg.from, to: msg.to, content: msg.content, contentType: msg.contentType}],
                lastMessage:{content:msg.content,from:msg.from,contentType:msg.contentType,createDt:Date.now}
            }).save();
            //刷新聊天室
            refreshRoom(socket,db)(from);
            refreshRoom(socket,db)(to);
        }else{
            //若有聊天室,则将消息打入聊天室
            console.log('消息存入房间');
            chatRoom.messages.push({
                from: msg.from,
                to: msg.to,
                content: msg.content,
                contentType: msg.contentType
            });
            chatRoom.lastMessage= {from:msg.from,content:msg.content,contentType:msg.contentType,createDt:Date.now};
            await  db.chatRoom.update({_id: chatRoom._id}, chatRoom, {}, function (err) {
                if(err)console.error(err);
            });
        }
    }
};



var refreshRoom = function (socket,db){
    return async  function(msg) {
        console.log('refresh room:',msg.phone);
        var chatRooms = await db.chatRoom.find({
            people: msg.phone
        }).exec();
        for (var i = 0; i < chatRooms.length; i++) {
            //显示聊天室时间,头像,名称
            chatRooms[i].lastMessage.createDtStr = moment(chatRooms[i].lastMessage.createDt).format("HH:mm");
            var otherPhone = chatRooms[i].people.find(function (peoplePhone) {
                return peoplePhone != msg.phone;
            });
            console.log(otherPhone);
            let [student] =await db.Student.find({phone: otherPhone}).exec();
            console.log(student);
            chatRooms[i].name = student.name;
            chatRooms[i].headPic = student.headPic;
            console.log(chatRooms[i].headPic);
            chatRooms[i].otherPhone = otherPhone;
            chatRooms[i].lastMessage.createDt =  moment(chatRooms[i].lastMessage.createDt).format('HH:mm');
        }
        console.log(chatRooms);
        socket.emit('refresh room', chatRooms);
    }
};

//刷新朋友列表,暂时刷新所有的旅烨实习生,不包括自己
var refreshFriends =  function(socket,db){
    return  async function(msg){
        console.log('refresh students:',msg.phone);
        var students =  await db.Student.find({phone:{$nin:[msg.phone]}}).exec();
        socket.emit('refresh students',students);
    }
};
