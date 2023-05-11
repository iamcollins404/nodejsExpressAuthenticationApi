const express = require("express")
const router = express.Router()

// import sign in controller
const SignUnController = require("../../controllers/authControllers/signup.controller")

router.post('/', SignUnController)

module.exports = router