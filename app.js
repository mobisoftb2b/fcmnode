
//var express = require('express');

//var app = express();

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

var FCM = require('fcm-node');
var serverKey = require('./straussmanagers-firebase-adminsdk-h32bt-9f4429aa14.json'); //put the generated private key path here
//var serverKey = require('./mtnmanagerstrauss-88c750efa13e.json');
var fcm = new FCM(serverKey);

console.log(process.argv);

var channelId = process.argv[2];
var pushAddress = process.argv[3];
var message = process.argv[4];

//console.log(message);

var pushmessage = {
    MessageTitle: 'MtnManager',
    MessageText: message
}

//sendPushMessageToUser("f8YL3HD6TdKRqC72-2nu5X:APA91bHul5OgswIaLRIWbHeiOIXyAMebyO-oPW81edRTkEzFdoO3yOJ5k055doVp_lyPJI3xWTsua62uMYLOIOHI-lTBDgQESjqt_Ckepo5SmzKTQ9RHnslg1lWLo-UHPvtjpkxknx9H", pushmessage, 3);

sendPushMessageToUser(pushAddress, pushmessage, 3);


function sendPushMessageToUser(pushAddress, message, badge) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)

        to: pushAddress,

        "notification": {
            "title": message.MessageTitle,
            //"text": message.MessageText,
            "body": message.MessageText,
            "sound": "default",
            "android_channel_id": channelId,
            "high_priority": "high",
            "show_in_foreground": "true",
            "badge":"" + badge
            // "custom_data": {"content-available": "1"}
        },
        "data": {
            "title": message.MessageTitle,
            "body": message.MessageText,
            "android_channel_id": channelId,
            "badge":"" + badge
            //  "custom_data": {"content-available": "1"}
        }
    }

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong! err=", err);
        } else {
            console.log("Successfully sent with response: ", response);
            if (response.results && Array.isArray(response.results) && response.results.length > 0){
                console.log("Send Error", response.results[0].error);
            }
               
            
        }
        process.exit();
    });
}
//module.exports = app;
