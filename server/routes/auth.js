const express = require('express');
const AuthController = require('../controllers/authControllers');
const auth = require('../auth/index');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
//router.post('/logout', AuthController.logoutUser);
router.post('/verify', auth.verifyToken);

module.exports = router;