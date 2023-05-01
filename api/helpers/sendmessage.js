module.exports = {


    friendlyName: 'Sendmessage',


    description: 'Sendmessage something.',


    inputs: {
        messageText: { type: "string" }
    },


    exits: {

        success: {
            description: 'All done.',
        },

    },


    fn: async function(inputs) {
        console.log(inputs.messageText);
        // TODO
    }


};