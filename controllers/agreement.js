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

const create = async (req, res) => {
    try{
        const agreement = await Agreement.create({
            type: req.body.type,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            description: req.body.description,
            owner: req.user._id,
            customer: req.user._id,
            asset: req.body.asset,
        });
        res.status(201).json(agreement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    index,
    create,
}