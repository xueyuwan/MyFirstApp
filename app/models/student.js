var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var studentSchema = new Schema({
    name:{type:String,require:true},
    phone:{type:String,require:true},
    password:{type:String,require:true},
    job:{type:String,require:true},
    gender:{type:String,require:true},
    prefix:{type:String},
    headPic:{type:String,default:''},
    signature:{type:String},
    createDt:{type:Date,default:Date.now},
    lastModifiedDate:{type:Date}
});


var Student= mongoose.model('student',studentSchema);

module.exports = {Student};