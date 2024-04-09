const bcrypt = require('bcrypt');
const db = require('../db/database'); // Import the pool
const { randomInt } = require('firebase-tools/lib/utils');

const registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        if (firstName.length <= 3 || lastName.length <= 3){
            return res.status(400).json({ message: "Name must be at least 4 characters"})
        }

        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        let url = "temp"
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.query('INSERT INTO users (url, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [url, email, firstName, lastName, hashedPassword]);
        const user = newUser.rows[0];

        res.status(201).json({ data: user, message: "User created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser };