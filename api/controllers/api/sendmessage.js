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
    let replacement_dict = [
        ['#@userNum', '#@userId'],
        ['chatphone', 'chatName', ]
    ];
    let chatAccount = await ChatAccount.findOne({ apiKey: post.apiKey }).populate('yanisAccount').populate('user');
    if (chatAccount) {
        const chatId = post.destination.substring(1) + "@c.us";
        const number_details = await sails.config.globals.yanis_sessions[chatAccount.yanisAccount.botName].getNumberId(chatId);
        if (number_details) {
            let finalMessage = post.message;
            for (let i = 0; i < replacement_dict[0].length; i++) {
                finalMessage = finalMessage.replace(replacement_dict[0][i], chatAccount[replacement_dict[1][i]])
            }
            finalMessage += "\n\n📤💫 _Envoyé via Yanis-bot Yacoco!_"
            sails.config.globals.yanis_sessions[chatAccount.yanisAccount.botName].sendMessage(number_details._serialized, finalMessage); // send message
            return res.ok("Message envoyé avec success au " + post.destination + " via " + chatAccount.yanisAccount.botName);
        } else {
            return res.ok(post.destination + " n'est pas un numéro valable sur whatsapp");
        }
    }
};