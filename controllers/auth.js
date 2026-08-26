const User = require("../models/users")
const bcrypt = require("bcrypt")


const signUp = async (req,res) => {
    try {
        const userInDatabase = await User.findOne({
            $or: [
                { email: req.body.email }

            ]
        })

        if (userInDatabase) {
            return res.status(409).json({ err: 'A user with this email or license number already exists.' })
        } 

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData ={
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({
                err: "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
            })
        }
        const user = await User.create(userData)

        const payload = { username: user.username, _id: user._id, role: user.role }

        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(201).json({ token })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}