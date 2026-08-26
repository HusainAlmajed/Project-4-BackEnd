const Inspection = require("../models/inspection")

const index = async (req , res) => {
    try {
        const inspection = await Inspection.find().populate('agreement')

        res.status(200).json(inspection)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    index,
}