module.exports = {


    friendlyName: 'Recevemessage',


    description: 'Recevemessage something.',


    inputs: {

    },


    exits: {

        success: {
            description: 'All done.',
        },

    },


    fn: async function(inputs) {
        console.log("message reçu");
    }


};