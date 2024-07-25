const express = require('express');
const requireAuth = require('../middleware/requireAuth');
// controller
const { signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser)

// sign up route
router.post('/signup', signupUser)

// verify token for client
router.post('/validate-token', requireAuth, (req, res) => {
    res.status(200).json({ isValid: true });
});

module.exports = router;