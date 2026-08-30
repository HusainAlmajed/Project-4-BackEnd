const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    assetType: {
        type: String,
        enum: ['equipment', 'vehicle', 'property', 'electronic', 'other'],
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
        required: false,
    }
},{timestamps: true})

const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset