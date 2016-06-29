var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSechema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    username : String,
    password : String
});
UserSechema= mongoose.model('User',UserSechema);

module.exports = {UserSechema};