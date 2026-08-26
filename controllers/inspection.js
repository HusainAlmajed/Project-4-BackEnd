const Inspection = require("../models/inspection")

const index = async (req , res) => {
    try {
        const inspection = await Inspection.find().populate('agreement')

        res.status(200).json(inspection)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const create = async (req , res) => {
    try {
        const inspection = await Inspection.create({
            inspectionType: req.body.inspectionType,
            images: req.body.images,
            notes: req.body.notes,
            date: req.body.date,
            agreement: req.body.agreement,
        })
        res.status(201).json(inspection)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const show = async (req , res) => {
    try{
        const inspection = await Inspection.findById(req.params.inspectionId).populate('agreement')

        if (!inspection) {
            return res.status(404).json({ message: 'Inspection not found' })
        }

        res.status(200).json(inspection)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req , res) => {
    try {
        const inspection = await Inspection.findByIdAndUpdate(
            req.params.inspectionId,
            req.body,
            { new: true }
        )

        if (!inspection) {
            return res.status(404).json({ message: 'Inspection not found '})
        }
        res.status(200).json(inspection)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    index,
    create,
    show,
    update,
}