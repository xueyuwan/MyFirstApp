var Logic = require('../../config/proxy/logic/Logic');
var fs = require('graceful-fs');
var path = require('path');

class TestLogic extends Logic {

    constructor(service) {
        super(service);
    }

    doAction(action) {
        switch (action) {
            case "testuplpadbase64":
                return this.testuploadbase64;
        }
    }

    async testuploadbase64(req,res){
        var result =  {state:1,issuccess:false};




        var filename = await super.saveBase64Image(req.body.base64);

        res.json(
            {
                data:'http://localhost:3000/'+filename
            }
        );


    }

}

module.exports = new TestLogic('test');
