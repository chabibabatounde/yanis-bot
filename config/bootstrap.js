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
    const fs = require('fs');
    const { Client, RemoteAuth, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');

    sails.config.globals.yanis_sessions = {
        Celtis_Benin: undefined,
        // Lycamobile_France: undefined,
        // Mtn_Benin: undefined,
    };

    for (let i = 0; i < Object.keys(sails.config.globals.yanis_sessions).length; i++) {
        const key = Object.keys(sails.config.globals.yanis_sessions)[i];

        /* =========================================CLASSIC================================================= */

        //sails.config.globals.yanis_sessions[key] = new Client();

        /* =========================================MONGO================================================= */


        /* ==================================LegacySessionAuth=============================================== */
        /*
        let SESSION_FILE_PATH = './session_' + key + '.json';
        let sessionData;
        if (fs.existsSync(SESSION_FILE_PATH)) {
            sessionData = require(SESSION_FILE_PATH);
        }
        sails.config.globals.yanis_sessions[key] = new Client({
            authStrategy: new LegacySessionAuth({
                session: sessionData
            })
        });
        sails.config.globals.yanis_sessions[key].on('authenticated', (session) => {
            sessionData = session;
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
        /* ======================================COMMON===================================================== */
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
            replyString += "Si vous avez reçu précedement un message venant de moi, c'est que vous ne devriez normalement pas y répondre 😇. \n";
            replyString += "\n 🖥️ _YANIS est un produit développé par https://rodolpho-babatounde.net/_ \n";
            let mgs_reply = "Hello Hello 👋🏼!\nJe suis Yanis, un robot whatsapp développé pour vous envoyer automatiquement des messages. ";
            mgs_reply += "Je ne suis malheuresement pas en mesure de traiter votre méssage et y répondre convenablement😕. ";
            mgs_reply += "Néanmoins, je ferai de mon mieux pour transmettre votre message à qui de droit😇.";
            mgs_reply += "\n\n🎊😊 Yacoco!";
            replyString += "\n 🖥️ _Yanis est un service développé par https://rodolpho-babatounde.net/_";
            message.reply(mgs_reply);
            //message.reply(replyString);
        });
    }
};