var BaseLogic = require('../base/BaseLogic');


class Logic extends BaseLogic{
    constructor (service){
        super();
        this.service = service;
        this.db =require('../../../config/auto-model');
    }
}





 module.exports = Logic;