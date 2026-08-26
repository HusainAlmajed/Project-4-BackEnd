const mongoose = require('mongoose')

const assetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
},{timestamps: true})

const Asset = mongoose.model('Asset', assetSchema)