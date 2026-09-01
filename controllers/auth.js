const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Business = require('../models/business')


const customerSignUp = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ email: req.body.email })

        if (userInDatabase) {
            return res.status(409).json({ err: 'A user with this email already exists.' })
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone,
            role: "customer",
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({
                err: "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
            })
        }
        const user = await User.create(userData)

        const payload = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            _id: user._id
        }

        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(201).json({ token })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const ownerSignUp = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ email: req.body.email })

        if (userInDatabase) {
            return res.status(409).json({ err: 'A user with this email already exists.' })
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone,
            role: "owner",
        }
        const user = await User.create(userData)

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({
                err: "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
            })
        }
        const businessData = {
            name: req.body.name,
            type: req.body.type,
            owner: user._id,
        }

        const business = await Business.create(businessData)

        const payload = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            _id: user._id
        }

        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(201).json({ token })

    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const signIn = async (req, res) => {
    try {

        const userInDatabase = await User.findOne({ email: req.body.email })

        if (!userInDatabase) {
            return res.status(404).json({ err: 'Invalid email or password.' })
        }
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)

        if (!validPassword) {
            return res.status(401).json({ err: 'Invalid email or password..' })
        }

        const payload = {
            username: userInDatabase.username,
            email: userInDatabase.email,
            phone: userInDatabase.phone,
            _id: userInDatabase._id,
            role: userInDatabase.role
        }
        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({ err: err.message })
    }
}

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

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

const update = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                profileImage: req.body.profileImage
            },
            {
                new: true
            }
        )

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

module.exports = {
    customerSignUp,
    ownerSignUp,
    signIn,
    update,
    show,
}