const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    business:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    }
},{timestamps: true})

const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset