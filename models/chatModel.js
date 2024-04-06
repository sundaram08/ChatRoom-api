const mongoose = require ('mongoose')

const messageSchema =  new mongoose.Schema(
    {
        message:{
            type: String,
            required: true 
        },
        username:{
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = {
    Message: mongoose.model('Message', messageSchema)
};