var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
    //手机号
    people:[{type:Schema.ObjectId, ref:'student'}],
    createDt:{type:Date,default:Date.now},
    messages:[{type:Schema.ObjectId,ref:'message'}],
    lastMessage:{type:Schema.ObjectId,ref:'message'},
    //聊天室的显示的消息
    talkTo: {type:Schema.ObjectId, ref:'student'}
});


var ChatRoom= mongoose.model('ChatRoom',chatRoomSchema);

module.exports = {ChatRoom};