//生产环境设置
var config  = require('./config'),
    mongoose = require('mongoose');
var db= function(){
    var db = mongoose.connect(config.db);
    require('../config/auto-model');
    return db;
};
module.exports = db;
