const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    phone: {
        type: String,
        required: true
    },

    contactType: {
        type: String,
        default: 'personal'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Contact', contactSchema)