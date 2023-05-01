/**
 * Module dependencies
 */

// ...


/**
 * api/sendmessage.js
 *
 * Sendmessage api.
 */
module.exports = async function sendmessage(req, res) {
    let post = req.body;
    if (typeof String.prototype.replaceAll === "undefined") {
        String.prototype.replaceAll = function(match, replace) {
            return this.replace(new RegExp(match, 'g'), () => replace);
        }
    }
    let replacement_dict = [
        ['#@userNum', '#@userId'],
        ['chatphone', 'chatName', ]
    ];
    let destinataire_replacement = [
        [' ', ''],
        [',', ''],
        ['/', ''],
        ['-', ''],
        ['_', '']
    ];
    let chatAccount = await ChatAccount.findOne({ apiKey: post.apiKey }).populate('yanisAccount').populate('user');
    if (chatAccount) {
        let dest = post.destination.substring(1);
        for (let i = 0; i < destinataire_replacement.length; i++) {
            dest = dest.replaceAll(destinataire_replacement[i][0], destinataire_replacement[i][1])
        }
        const chatId = dest + "@c.us";
        const number_details = await sails.config.globals.yanis_sessions[chatAccount.yanisAccount.botName].getNumberId(chatId);
        if (number_details) {
            let finalMessage = post.message;
            for (let i = 0; i < replacement_dict[0].length; i++) {
                finalMessage = finalMessage.replaceAll(replacement_dict[0][i], chatAccount[replacement_dict[1][i]])
            }
            finalMessage += "\n\n_Méssage envoyé via Yanis-bot Yacoco!_"
            finalMessage += "\n_Merci de ne pas y répondre_";
            //finalMessage += "\n_Produit développé par_";
            //finalMessage += "\n_https://rodolpho-babatounde.net/_";

            sails.config.globals.yanis_sessions[chatAccount.yanisAccount.botName].sendMessage(number_details._serialized, finalMessage); // send message
            console.log("Message envoyé avec success au " + post.destination + " via " + chatAccount.yanisAccount.botName);
            return res.ok("Message envoyé avec success au " + post.destination + " via " + chatAccount.yanisAccount.botName);
        } else {
            return res.ok(post.destination + " n'est pas un numéro valable sur whatsapp");
        }
    }
};