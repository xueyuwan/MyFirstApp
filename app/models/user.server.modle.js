var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSechema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    username : String,
    password : String,
    phone:String,
createDt:{type:Date,default :Date.now}
});

UserSechema= mongoose.model('User',UserSechema);

UserSechema.methods = function(phone,password){
    
};


module.exports = {UserSechema,findUserByPhone};