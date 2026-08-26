const mongoose = require('mongoose')

const agreementSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'expiring soon', 'expired'],
        default: 'active',
    },
},{timestamps: true})

const Agreement = mongoose.model('Agreement', agreementSchema)