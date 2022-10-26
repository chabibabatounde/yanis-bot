/**
 * Module dependencies
 */

// ...


/**
 * connexion.js
 *
 * Connexion something.
 */
module.exports = async function connexion(req, res) {


    /*
    const fs = require('fs');


    const { Client, LocalAuth } = require('whatsapp-web.js');
    const qrcode = require('qrcode-terminal');

    let post = req.body;

    const SESSION_FILE_PATH = './session.json';

    connetionParam = { authStrategy: new LocalAuth("./session/yanis-france/") }

    //const { Client, LocalAuth } = require('whatsapp-web.js');
    //const client = new Client(connetionParam);

    const client = new Client();


    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
        console.log("Authetifié");
    });

    client.on('ready', () => {
        console.log('whatsapp is ready');
    });

    client.on('message', msg => {
        msg.reply('Bonjour ' + msg.notifyName + ".\nJe suis Yanis, le robot whatsapp développé par @chabibabatounde");
    });


    if (post.key === "lbLhjxuvfvkL42a853VE87RPnqzhlB0ysJUzZIRxQY8MYlRyY") {
        client.initialize();
        console.log(post);
    }

    */

    // Number where you want to send the message.
    const number = "+22996466808";
    //const number = "+33605775142";
    const messageText = "Méssage envoyé automatiquement!";

    const chatId = number.substring(1) + "@c.us";

    // Sending message.

    const number_details = await sails.config.globals.yanis_sessions.celtis_benin.getNumberId(chatId);
    if (number_details) {
        await sails.config.globals.yanis_sessions.celtis_benin.sendMessage(number_details._serialized, messageText); // send message
    } else {
        console.log(number, "Mobile number is not registered");
    }
    sessions_list = ['celtis_benin']

    return res.ok();
};