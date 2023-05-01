/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {
    const qrcode = require('qrcode-terminal');
    const { Client } = require('whatsapp-web.js');
    const client = new Client();

    sails.config.globals.yanis_sessions = {
        Celtis_Benin: undefined,
        // Lycamobile_France: undefined,
        // Mtn_Benin: undefined,
    };

    for (let i = 0; i < Object.keys(sails.config.globals.yanis_sessions).length; i++) {
        const key = Object.keys(sails.config.globals.yanis_sessions)[i];
        sails.config.globals.yanis_sessions[key] = new Client();
        sails.config.globals.yanis_sessions[key].initialize();
        sails.config.globals.yanis_sessions[key].on('qr', qr => {
            console.log(key);
            qrcode.generate(qr, { small: true });
        });
        sails.config.globals.yanis_sessions[key].on('ready', () => {
            console.log(key + ' Is ready!');
        });
        sails.config.globals.yanis_sessions[key].on('message', message => {
            let replyString = "Hello 👋🏼, \n";
            replyString += "Je suis Yanis😊, un robot chargé de vous envoyer automatiquement des méssages via Whatsapp.\n";
            replyString += "Je ne suis malheureusement pas en mesure de traiter votre méssage.😕\n";
            replyString += "Si vous avez reçu précedement un message venant de moi, c'est que vous ne devriez normalement pas y répondre. 😇\n";
            replyString += "\n 🖥️ _YANIS est un produit développé par https://rodolpho-babatounde.net/_ \n";
            message.reply(replyString);
            //console.log(message.body);
            //sails.helpers.recevemessage(message)
        });
    }
};