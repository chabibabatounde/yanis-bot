/**
 * Module dependencies
 */

// ...


/**
 * request/message/send.js
 *
 * Send message.
 */
module.exports = async function send(req, res) {

    let response = {
        code: 500,
        body: "Une erreur est survenue lors de l'envoi de votre message",
        content: {}
    }
    const POST = req.body;

    if (POST.apiKey) {
        if (await sails.helpers.authentification(POST.apiKey)) {
            if (await sails.helpers.isavailablenumber(POST.dest)) {
                if (await sails.sendmessage(POST.messageText)) {
                    response = {
                        code: 200,
                        body: "Méssage envoyé avec succès au " + POST.dest,
                        content: {
                            timestamp: "",
                            dest: "",
                            messageText: "",
                        }
                    }
                }
            } else {
                response = {
                    code: 404,
                    body: "Le numéro du destinataire n'est pas disponible sur Whatsapp",
                    content: {}
                }
            }

        } else {
            response = {
                code: 500,
                body: "ApiKey non reconnu",
                content: {}
            }
        }
    }


    return res.json(response);

};