var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentSechema = new Schema({
    name:{type:String,require:true},
    phone:{type:String,require:true},
    password:{type:String,require:true},
    prefix:{type:String},
    headpic:{type:String,default:''},
    job:{type:String},
    createdt:{type:Date,default:Date.now()},
    lastModifiedDate:{type:Date}

});


var Student= mongoose.model('student',StudentSechema);

module.exports = {Student};