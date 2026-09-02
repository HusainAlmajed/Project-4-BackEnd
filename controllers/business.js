const Business = require("../models/business")

// Get all businesses
const indexBusinesses = async (req, res) => {
    try {

        const businesses = await Business.find()
            .populate("owner", "username email phone")

        res.status(200).json(businesses)

    } catch (error) {

        res.status(500).json({
            err: error.message
        })

    }
}


// Get one business
const showBusiness = async (req, res) => {
    try {

        const business = await Business.findById(
            req.params.businessId
        ).populate("owner", "username email phone")

        if (!business) {
            return res.status(404).json({
                err: "Business not found"
            })
        }

        res.status(200).json(business)

    } catch (error) {

        res.status(500).json({
            err: error.message
        })

    }
}


// Delete business
const deleteBusiness = async (req, res) => {
    try {

        const business = await Business.findByIdAndDelete(
            req.params.businessId
        )

        if (!business) {
            return res.status(404).json({
                err: "Business not found"
            })
        }

        res.status(200).json({
            message: "Business deleted successfully"
        })

    } catch (error) {

        res.status(500).json({
            err: error.message
        })

    }
}


module.exports = {
    indexBusinesses,
    showBusiness,
    deleteBusiness
}