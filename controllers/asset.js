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

const create = async (req, res) => {
    try {
        const asset = await Asset.create({
            name: req.body.name,
            type: req.body.type,
            owner: req.user._id,
            business: req.body.business,
        })
        res.status(201).json(asset)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const show = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id)
        .populate('owner')
        .populate('business')

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' })
        }

        res.status(200).json(asset)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
            )
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' })
        }
        res.status(200).json(asset)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    index,
    create,
    show,
    update
}