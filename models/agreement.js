const mongoose = require('mongoose')

const agreementSchema = new  mongoose.Schema({
    type: {
        type: String,
        enum: ['warranty', 'insurance'],
        required: true,
        trim: true,
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
    },
    description: {
        type: String,
        required: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true,
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
},{timestamps: true})

const Agreement = mongoose.model('Agreement', agreementSchema)

module.exports = Agreement