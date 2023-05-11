const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import user model
const User = require("../../models/user.model")

const SignUp = asyncHandler(async (req, res) => {
    const userrole = "user"
    const { fullname, email, countryofresidence } = req.body
    let rawpassword = req.body.password

    // harsh the password
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(rawpassword, salt);

    // check if user email already exists
    const userEmailExist = await User.findOne({ email })

    if (!userEmailExist) {
        try {
            const createdUser = await User.create({
                userrole,
                fullname,
                email,
                countryofresidence,
                password
            })

            // json token
            const token = await jwt.sign(
                { _id: createdUser._id },
                process.env.SECRET_TOKEN
            )

            res.header("authToken", token).json({
                message: "Successfully logged in",
                fullName: createdUser.fullname,
                loggedIdUser: createdUser._id,
                authToken: token,
                userrole: createdUser.userrole
            })

        } catch (error) {
            throw new Error(error)
        }

    } else {
        throw new Error("user email already exists")
    }
})

module.exports = SignUp