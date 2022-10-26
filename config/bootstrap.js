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
    const fs = require('fs');
    const { Client, LocalAuth } = require('whatsapp-web.js');
    const qrcode = require('qrcode-terminal');
    const SESSION_FILE_PATH = './WebWhatsapp_Session';

    if (!fs.existsSync(SESSION_FILE_PATH)) {
        fs.mkdirSync(SESSION_FILE_PATH, { recursive: true });
    }

    sails.config.globals.yanis_sessions = {};

    sessions_list = ['celtis_benin']
        //sessions_list = ['celtis_benin', 'lycamobile_france']
    for (let index = 0; index < sessions_list.length; index++) {
        const web_whatsapp_name = sessions_list[index];
        console.log('\n Begin', web_whatsapp_name + " authentification...")
        let web_whatsapp_session
        let session_path = SESSION_FILE_PATH + "/" + web_whatsapp_name + ".json";

        if (fs.existsSync(session_path)) {
            web_whatsapp_session = require(session_path);
        }
        const web_whatsapp_client = new Client({
            authStrategy: new LocalAuth({ clientId: "client-one", session: web_whatsapp_session })
        });

        web_whatsapp_client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        web_whatsapp_client.on('ready', () => {
            sails.config.globals.yanis_sessions[web_whatsapp_name] = web_whatsapp_client;
            console.log(web_whatsapp_name, 'is ready!');
        });

        web_whatsapp_client.on('authenticated', (session) => {
            console.log(web_whatsapp_name, 'authenticated!');
            /*
            fs.writeFile(session_path, JSON.stringify(session), (err) => {
                if (err) {
                    console.error(err);
                }
            });
            */
        });

        web_whatsapp_client.on('message', msg => {
            let mgs_reply = "Hello Hello! \n\nJe suis Yanis, un robot whatsapp développé par @chabibabatounde ";
            mgs_reply += "pour vous envoyer automatiquement des messages. ";
            mgs_reply += "Je ne suis malheuresement pas en mesure de traiter votre méssage et y répondre convenablement.";
            mgs_reply += "Néanmoins, je ferai de mon mieux pour transmettre votre message à qui de droit.";
            mgs_reply += "\n\n*🎊😊 Yacoco!*";
            msg.reply(mgs_reply);
        });


        await web_whatsapp_client.initialize();

    }



    /*******************************
    sails.config.globals.yanis_sessions.celtis_benin;
    if(fs.existsSync(SESSION_FILE_PATH)) {
        sessionData = require(SESSION_FILE_PATH);
    }

    // Use the saved values
    sails.config.globals.yanis_sessions.celtis_benin = new Client({
        session: sessionData
    });




// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});





    sails.config.globals.yanis_sessions = {
        //celtis_benin: new Client({ authStrategy: new LegacySessionAuth({ clientId: "celtis_benin" }) }),
        //lycamobile_france: new Client({ authStrategy: new LegacySessionAuth({ clientId: "lycamobile_france" }) })
    };


    if (!fs.existsSync(SESSION_FILE_PATH)) {
        fs.mkdirSync(SESSION_FILE_PATH);
    }


    let celtis_benin;
    if (fs.existsSync(SESSION_FILE_PATH + "/celtis_benin.json")) {
        celtis_benin = require(SESSION_FILE_PATH + "/celtis_benin.json");
    }
    // Use the saved values
    const client = new Client({
        session: sessionData
    });

    // Save session values to the file upon successful auth
    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });











    sails.config.globals.yanis_sessions.celtis_benin.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    sails.config.globals.yanis_sessions.celtis_benin.on('ready', () => {
        console.log('Client is ready!');
    });

    sails.config.globals.yanis_sessions.celtis_benin.on('message', msg => {
        console.log(msg.body);
        msg.reply('Bonjour ' + msg.notifyName + ".\nJe suis Yanis, le robot whatsapp développé par @chabibabatounde");
    });

    sails.config.globals.yanis_sessions.celtis_benin.initialize();
    */

    /*

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


    client.initialize();
    */

    // === Configuration / Chargement des sessions de yanis bot //

};