var db = require('../../config/auto-model');

function Db (target){
    target.db=db;
}

module.exports=Db;