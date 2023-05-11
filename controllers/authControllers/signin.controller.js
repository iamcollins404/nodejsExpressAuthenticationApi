const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import user model
const User = require("../../models/user.model")

const SignIn = asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body

    const UserExists = await User.findOne({ phoneNumber })

    if (UserExists) {

        const validPassword = await bcrypt.compare(password, UserExists.password)

        if (!validPassword) {
            throw new Error("wrong password")
        }

        // json token
        const token = await jwt.sign(
            { _id: UserExists._id },
            process.env.SECRET_TOKEN
        )

        res.header("authToken", token).json({
            message: "Successfully logged in",
            fullName: UserExists.fullname,
            loggedIdUser: UserExists._id,
            authToken: token,
            userrole: UserExists.userrole
        })

    } else {
        throw new Error(`No user found with phone number ${phoneNumber}. Please Register if not registered.`)
    }
})


module.exports = SignIn