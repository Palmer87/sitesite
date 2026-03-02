const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'votre_secret_jwt_tres_securise', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Private/Superadmin (or Public if no users exist)
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Check if this is the first user being created
    const count = await User.countDocuments();
    if (count > 0) {
        // If users exist, we must check if the requester is an authenticated superadmin
        if (!req.user || req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Not authorized: Only a superadmin can register new users' });
        }
    }

    // Determine role (force superadmin if it's the first user, otherwise respect request or default to editor)
    const assignedRole = (count === 0) ? 'superadmin' : (role || 'editor');

    const user = await User.create({
        name,
        email,
        password,
        role: assignedRole
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
