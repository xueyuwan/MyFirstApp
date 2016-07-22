var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var messageSchema = new Schema({
        from: {type:Schema.ObjectId,ref:'student'},
        to:{type:Schema.ObjectId,ref:'student'},
        createDt: {type: Date, default: Date.now},
        content: String,
        contentType: {type: String, default: 'text'},
});



var Message= mongoose.model('message',messageSchema);

module.exports = {Message};