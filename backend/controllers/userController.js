const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // logs user in
        const user = await User.login(email, password);

        // create tokeen
        const token = createToken(user._id);

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // adds user to database with validation checks
        const user = await User.signup(email, password);
        // create tokeen
        const token = createToken(user._id);

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }