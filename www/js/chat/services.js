angular.module('chat.services', [])
.factory('socketService',function(config){
var socket = io.connect(config.serverUrl);
    return {
        getSocket:function(){
            return socket
        }
    }
});