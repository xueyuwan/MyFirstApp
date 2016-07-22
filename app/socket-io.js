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
        socket.on('student information',studentInformation(socket,db));


    });
};

var studentInformation = function(socket,db){
    return async function(msg){
        console.log('student information:',msg.phone);
        var student =  await db.Student.find({phone:msg.phone}).exec();
        socket.emit('student information',student);
    }
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
        var  [fromStudent] = await db.Student.find({phone:msg.from},{_id:1}).exec();
        var [toStudent] = await db.Student.find({phone:msg.to},{_id:1}).exec();

        console.log(fromStudent,toStudent);

        //查询是否有两人的聊天室,若有,则将该消息存入聊天室,若没有,则创建两人的聊天室,
        var [chatRoom] = await  db.ChatRoom.find({people:{$all:[fromStudent._id,toStudent._id] } }).exec();
        var message = await new db.Message({
            from: fromStudent._id,
            to: toStudent._id,
            content: msg.content,
            contentType: msg.contentType
        }).save();
        //若没有该聊天室,则创建新的聊天室,并将消息打入聊天室
        if (!chatRoom) {
            //新建消息
                await new db.ChatRoom({
                    people: [fromStudent._id, toStudent._id],
                    messages: [message._id],
                    lastMessage: message._id,
                }).save();
                //刷新聊天室
                // refreshRoom(socket,db)(from);
                // refreshRoom(socket,db)(to);
        }else{
            //若有聊天室,则将消息打入聊天室
            chatRoom.messages.push(message._id);
            chatRoom.lastMessage= message._id;
            console.log(chatRoom);
            db.ChatRoom.update({_id:chatRoom._id},chatRoom,{},()=>{});
        }
    }
};



var refreshRoom = function (socket,db){
    return async  function(msg) {
        console.log('refresh room:',msg.phone);
        var [studentId]= await db.find({phone:msg.phone},{_id:1}).exec();
        var chatRooms = await db.ChatRoom.find({
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
        socket.emit('refresh students',students,{},function(){});
    }
};
