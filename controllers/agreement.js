const Agreement = require('../models/agreement');

const index = async (req, res) => {
    try{
        const agreements = await Agreement.find()
        .populate('owner')
        .populate('customer')
        .populate('asset')

        res.status(200).json(agreements)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    index,
}