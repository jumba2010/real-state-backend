var fs = require('fs');
const express = require('express');
const router = express.Router();
const SentMessage = require('../../models/sentmessage');
var http = require("https");
const keys = require('./../../config/keys');
var qs=require('querystring');



async function sendNotification(cellphone, message, senderId,studentId,sucursalId) {

    let stringfyedMessage=encodeURI(message); 
    var options = {
        "method": "GET",
        "hostname": "world.msg91.com",
        "port": 443,
        "path": `/api/sendhttp.php?mobiles=${cellphone}&authkey=${keys.msg91AuthKey}&unicode=1&route=4&sender=${senderId}&message=${stringfyedMessage}`,
        "headers": {}
    };

    var req = http.request(options, async function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", async function () {
            var body = Buffer.concat(chunks);
            let requestId=body.toString();
          let m= await SentMessage.create({sucursalId,studentId,requestId,message,senderId,number:cellphone}
                );

                console.log('Mensagens enviadas com sucesso');
        });
    });

    req.end();

}

module.exports = router;