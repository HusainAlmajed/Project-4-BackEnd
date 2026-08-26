const Document = require('../models/document')

const index = async (req , res) => {
    try{
        const documents = await Document.find().populate('agreement')

        res.status(200).json(documents)
    }catch(error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    index,
}