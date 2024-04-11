const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const verifyToken = (req, res) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Token has been authenticated." });
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

    return jwt.sign({ token: userID }, process.env.JWT_SECRET, {expiresIn: '30d'});
}

// TODO: Add refresh logic so that the token can be refreshed to allow for lower expiresIN time

module.exports = { verifyToken, findToken, signToken};
