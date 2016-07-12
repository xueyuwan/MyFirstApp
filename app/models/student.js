var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentSechema = new Schema({
    name:{type:String,require:true},
    phone:{type:String,require:true},
    passowrd:{type:String,require:true},
    headpic:{type:String},
    job:{type:String}
});

StudentSechema.statics.queryStudent = function(query){
        return this.find(query).exec();
};

StudentSechema.statics.addStudent = function(student){
    return new StudentSechema(student).save().exec();
}
StudentSechema.statics.isExsiting = function(phone){
 return new StudentSechema.find(phone).count().exec();
}

var Student= mongoose.model('student',StudentSechema);

module.exports = {Student};