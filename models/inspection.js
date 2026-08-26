const mongoose = require('mongoose')

const inspectionSchema = new mongoose.Schema({
    inspectionType: {
        type: String,
        enum: ['before' , 'after'],
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    agreement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agreement',
        required: true,
    },
},{timestamps: true})

const Inspection = mongoose.model('Inspection' , inspectionSchema)
module.exports = Inspection