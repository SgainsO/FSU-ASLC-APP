const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const verifyToken = (req, res, next) => {
    const token = req.header("userToken");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

const findToken = (req, res, next) => {
    const token = req.header("userToken");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        next();
    }
}

const signToken = (req, res, next) => {
    const token = req.header("userToken");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = { verifyToken, findToken };