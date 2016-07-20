var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
    //手机号
    people:{type:[String]},

    createDt:{type:Date,default:Date.now},
    messages:[{from:String,
        to:String,
        createDt:{type:Date,default:Date.now},
        content:String ,
        contentType:{type:String,default:'text'}
    }],
    lastMessage:{
        content:String,
        createDt:{type:Date,default:Date.now},
        createDtStr:String
    },
    //聊天室的显示的消息
    headPic:String,
    name:String
});


var chatRoom= mongoose.model('chatRoom',chatRoomSchema);

module.exports = {chatRoom};