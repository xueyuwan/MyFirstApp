var Logic = require('../../config/proxy/logic/Logic');
var path = require('path');

class ChatLogic extends Logic {
    constructor(service) {
        super(service);
    }
    doAction(action) {
        switch (action) {
            case "login":
                return this.login;
            case "forgotpassword":
                return this.forgotpassword;
            case "register":
                return this.register;
            case "testuplpad":
                return this.testupload;
        }
    }
}




module.exports = new ChatLogic('chat');