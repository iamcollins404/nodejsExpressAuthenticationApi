const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const dbConnect = require("./configs/dbConnect.config")

// dot env
const dotenv = require("dotenv")
dotenv.config()

// import error handler
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// import routes
const signInRoute = require("./routes/authRoutes/signin.route")
const signUpRoute = require("./routes/authRoutes/signup.route")

// connect DB
dbConnect(process.env.MONGODB_URI)

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// sign in route
app.use("/auth/signin", signInRoute)
app.use("/auth/signup", signUpRoute)

// app.use the error middlewares
// error Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})