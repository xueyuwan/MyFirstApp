var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var co = require('co');

var UserSechema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    username : String,
    password : String,
    phone:String,
createDt:{type:Date,default :Date.now}
});



UserSechema.statics.findUserByPhone = function(phone){
        return this.find({phone:phone}).limit(1).exec();
};





var User= mongoose.model('User',UserSechema);


module.exports = {User};