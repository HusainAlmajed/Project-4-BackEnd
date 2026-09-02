const User = require("../models/users")

const indexUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

const showUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                err: "User not found"
            })
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

const updateUserRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {
                role: req.body.role
            },
            {
                new: true
            }
        ).select("-password")

        if (!user) {
            return res.status(404).json({
                err: "User not found"
            })
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({
            err: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)

        if (!user) {
            return res.status(404).json({
                err: "User not found"
            })
        }

        res.status(200).json({
            message: "User deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            err: error.message
        })
    }
}

module.exports = {
    indexUsers,
    showUser,
    updateUserRole,
    deleteUser
}