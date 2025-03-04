const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            firstName, 
            lastName, 
            username, 
            email, 
            phone,
            password, 
            location 
        } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ 
            $or: [
                { email }, 
                { username },
                { phone }
            ] 
        });

        if (userExists) {
            let field = userExists.email === email ? 'email' : 
                       userExists.username === username ? 'username' : 'phone';
            return res.status(400).json({ 
                message: `User with this ${field} already exists` 
            });
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            phone,
            password,
            location
        });

        // Send verification email
        // TODO: Implement email verification

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                location: user.location,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for user by username or email
        const user = await User.findOne({
            $or: [
                { email: username.toLowerCase() },
                { username: username }
            ]
        }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user is active
        if (user.status !== 'active') {
            return res.status(401).json({ 
                message: 'Your account is not active. Please contact support.' 
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update last login
        await user.updateLastLogin();

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            location: user.location,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            location: user.location,
            rating: user.rating,
            successfulTrades: user.successfulTrades,
            profilePicture: user.profilePicture,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};