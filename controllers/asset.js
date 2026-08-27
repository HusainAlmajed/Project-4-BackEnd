const Asset = require('../models/asset');

const index = async (req, res) => {
    try{
        const assets = await Asset.find()
        .populate('owner')
        .populate('business')

        res.status(200).json(assets)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    index,
}