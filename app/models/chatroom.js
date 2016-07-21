var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
    //手机号
    people:[String],
    createDt:{type:Date,default:Date.now},
    messages:[{
        from:String,
        fromName:String,
        fromPic:String,
        to:String,
        toName:String,
        toPic:String,
        createDt:{type:Date,default:Date.now},
        content:String,
        contentType:{type:String,default:'text'},

    }],
    lastMessage:{
        content:String,
        createDt:{type:Date,default:Date.now},
        createDtStr:String,
        from:String,
    },
    //聊天室的显示的消息
    headPic:String,
    name:String,
    otherPhone:String
});


var chatRoom= mongoose.model('chatRoom',chatRoomSchema);

module.exports = {chatRoom};