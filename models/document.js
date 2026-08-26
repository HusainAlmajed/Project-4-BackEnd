const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    documentType: {
        type: String,
        enum: ['contract' , 'receipt' , 'warranty' , 'insurance' , 'other'],
        default: 'contract',
    },
    url: {
        type: String,
        required: true,
    },
    agreement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agreement',
        required: true,
    },
},{timestamps: true})

const Document = mongoose.model('Document' , documentSchema)
module.exports = Document