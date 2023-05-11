const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(function (req, res, next) {
    const token = req.header("authToken");
    if (!token) {
        res.status(400);
        throw new Error("Access Denied!");
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400);
        throw new Error("Invalid Token");
    }
});