var BaseLogic = require('../base/BaseLogic');
var db = require('../../../config/auto-model');

WebLogic.prototype = new BaseLogic;

function WebLogic(service){
    this.platform = "web";
    this.db = db;
    this.service = service;
    this.doAction = function(req,res){
        res.send('error this logic not implements weblogic doAction method');
    }
}

 module.exports = WebLogic;