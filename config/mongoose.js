//生产环境设置
var config  = require('./config'),
    mongoose = require('mongoose');
var db= function(){
    var db = mongoose.connect(config.db,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('connection to mongodb successfully');
        }

    });
    require('../config/auto-model');
    return db;
};
module.exports = db;
