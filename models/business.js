const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["shop", "property", 'insurance'],
        required: true,
    },
    customers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    profileImage: {
        type: String,
        default: "",
    },

}, { timestamps: true })


const Business = mongoose.model('Business', businessSchema)
module.exports = Business