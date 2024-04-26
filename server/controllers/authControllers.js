const bcrypt = require('bcrypt');
const db = require('../db/database'); // Import the pool
const auth = require("../auth");

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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await db.query('INSERT INTO users (url, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [url, email, firstName, lastName, hashedPassword]);
        const user = newUser.rows[0];


        let token = auth.signToken(user.id);

        if (!token) {
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(201).json({ userToken: token, userID: user.id, message: "User created successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        let token = auth.signToken(user.rows[0].id);

        if (!token) {
            return res.status(500).json({ message: "Internal server error" });
        }

        res.status(200).json({ userToken: token, userID: user.rows[0].id });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { registerUser, loginUser };