var Logic = require('../../config/proxy/logic/Logic');
var path = require('path');

class ChatLogic extends Logic {
    constructor(service) {
        super(service);
    }
    doAction(action) {
        switch (action) {
            case "listChatRoom":
                return this.listChatRoom;
    }
    }

    async listChatRoom(req,res){
        var result = {state:1,issuccess:true,msg:''};
        var  {phone} = req.query;
        var  chatRooms = await this.db.chatRoom.find({
            people: phone
        },{messages:0}).exec();
    // console.log(chatRooms.length);
    for (var i = 0; i < chatRooms.length; i++) {
        //显示聊天室时间,头像,名称
        chatRooms[i].lastMessage.createDtStr = await this.moment(chatRooms[i].lastMessage.createDt).format("HH:mm");

        var otherPhone = chatRooms[i].people.find(function (peoplePhone) {
            return peoplePhone != phone;
        });
        console.log(otherPhone);
        let [student] =await this.db.Student.find({phone:otherPhone}).exec();
        console.log(student);
        chatRooms[i].name=student.name;
        chatRooms[i].headPic = student.headPic;

    }

        result.data =chatRooms;
        res.json(result);
    }
}




module.exports = new ChatLogic('chat');