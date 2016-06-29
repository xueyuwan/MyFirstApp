var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var heh = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    username : String,
    password : String
});
mongoose.model('heh',heh);

module.exports = {heh};