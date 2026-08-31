const Agreement = require('../models/agreement');
const Asset = require('../models/asset');
const User = require('../models/users');

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
    try {

        const customer = await User.findOne({ 
            phone: req.body.customerPhone,
            role: 'customer'
        })

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const asset = await Asset.create({
            name: req.body.assetName,
            assetType: req.body.assetType,
            owner: req.user._id,
        })

        const agreement = await Agreement.create({
            type: req.body.type,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            description: req.body.description,
            owner: req.user._id,
            customer: customer._id,
            asset: asset._id,
        })

        const populatedAgreement = await Agreement.findById(agreement._id)
            .populate("owner")
            .populate("customer")
            .populate("asset")

        res.status(201).json(populatedAgreement)
    } catch (error) {
        console.error("CREATE AGREEMENT ERROR:", error)
        res.status(500).json({ message: error.message })
    }
}



const show = async (req, res) => {
    try{
        const agreement = await Agreement.findById(req.params.agreementId)
        .populate('owner')
        .populate('customer')
        .populate('asset')

        if (!agreement) {
            return res.status(404).json({ message: 'Agreement not found' });
        }
        res.status(200).json(agreement);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try{
        const agreement = await Agreement.findByIdAndUpdate(
            req.params.agreementId,
            req.body,
            { new: true }
        )
        .populate('owner')
        .populate('customer')
        .populate('asset');

        if (!agreement) {
            return res.status(404).json({ message: 'Agreement not found' });
        }
        res.status(200).json(agreement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAgreement = async (req, res) => {
    try {
        const agreement = await Agreement.findByIdAndDelete(req.params.agreementId);

        if (!agreement) {
            return res.status(404).json({ message: 'Agreement not found' });
        }

        await Asset.findByIdAndDelete(agreement.asset);

        res.status(200).json({ message: 'Agreement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const customerAgreements = async (req, res) => {
    try {
        const agreements = await Agreement.find({ customer: req.user._id })
            .populate('owner')
            .populate('customer')
            .populate('asset');

        res.status(200).json(agreements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    index,
    create,
    show,
    update,
    deleteAgreement,
    customerAgreements,
}