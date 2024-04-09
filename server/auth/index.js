const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header("userToken");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        
        res.status(200).json({ message: "Token has been authenticated."})
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

const findToken = (req, res, next) => {
    const token = req.header("userToken");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        next();
    }
}

const signToken = (userID) => {
    console.log(userID)

    return jwt.sign({ token: userID }, process.env.JWT_SECRET);
}

module.exports = { verifyToken, findToken, signToken};