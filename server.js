const express = require("express")
const app = express()
const dotenv = require("dotenv")

// import routes
const signInRoute = require("./routes/authRoutes/signin.route")
const signUpRoute = require("./routes/authRoutes/signup.route")

dotenv.config()

// sign in route
app.use("/auth/signin", signInRoute)
app.use("/auth/signup", signUpRoute)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})