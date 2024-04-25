const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Create User
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required', type : 'warning' });
    }
    // Check password confirmation
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match', type : 'warning' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists', type : 'warning' });
        }

        // Hash password and create user if not exist
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser({ name, email, password: hashedPassword });
        return res.status(201).json({ message: 'User created successfully', user: newUser, type : 'success' });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: "Something went wrong in the registration process!", error: error.message, type : 'error' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.getUserByEmail(req.body.email);
        if (!user) {
            res.status(400).json({ message: 'User does not exist', type : 'warning' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            //res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, "myscret", { expiresIn: '24h' });
        res.header('auth-token', token).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error, type : 'error' });
    }
});

module.exports = router;