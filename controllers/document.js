const Document = require('../models/document')

const index = async (req , res) => {
    try{
        const documents = await Document.find().populate('agreement')

        res.status(200).json(documents)
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const create = async (req , res) => {
    try{
        const document = await Document.create({
            title: req.body.title,
            documentType: req.body.documentType,
            url: req.body.url,
            agreement: req.body.agreement,
        })
        res.status(201).json(document)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const show = async (req , res) => {
    try{
        const document = await Document.findById(req.params.documentId).populate('agreement')

        if (!document) {
            return res.status(404).json({ message: 'Document not found' })
        }
        res.status(200).json(document)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    index,
    create,
    show,
}