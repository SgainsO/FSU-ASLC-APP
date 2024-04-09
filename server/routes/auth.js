const express = require('express');
const AuthController = require('../controllers/authControllers');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.post('/register', AuthController.registerUser);

module.exports = router;