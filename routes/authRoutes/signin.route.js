const express = require("express")
const router = express.Router()

// import sign in controller
const SignInController = require("../../controllers/authControllers/signin.controller")

router.post('/', SignInController)

module.exports = router