var WebSocketClient = require('websocket').client;

var user = "user"
var code = "code"

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connection error: ' + error.toString());
});
client.on('connect', function(connection) {
    console.log("WebSocket client connected: " + connection.connected)
    connection.on('error', function(error) {
        console.log("WebSocket connection error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('WebSocket connection closed');
    });
    connection.on('message', function(message) {
        var boardStr = message.utf8Data;
        console.log("Board received: " + boardStr)
        connection.sendUTF(whatToDo(boardStr))
    })

});

client.connect('ws://localhost:8080/codenjoy-contest/ws?user=' + user + '&code=' + code)

function whatToDo(boardStr) {
    // TODO your code here
    return "ACT(1)"
}