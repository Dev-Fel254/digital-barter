const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Connect to MongoDB
(async () => {
    const dbConnected = await connectDB();
    
    if (dbConnected) {
        // Only register database-dependent routes if connected
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/items', require('./routes/items'));
        app.use('/api/trades', require('./routes/trades'));
    } else {
        // Provide mock responses for essential routes when DB is unavailable
        app.post('/api/auth/login', (req, res) => {
            res.json({ 
                token: 'mock-token-for-development',
                _id: '123456789',
                firstName: 'Test',
                lastName: 'User',
                email: req.body.email || 'test@example.com'
            });
        });
        
        app.post('/api/auth/register', (req, res) => {
            res.status(201).json({ message: 'User registered successfully (mock)' });
        });
        
        app.get('/api/auth/profile', (req, res) => {
            res.json({
                _id: '123456789',
                firstName: 'Test',
                lastName: 'User',
                username: 'testuser',
                email: 'test@example.com',
                phone: '+1234567890',
                location: 'Test Location',
                rating: 5,
                successfulTrades: 10,
                isEmailVerified: true,
                isPhoneVerified: true
            });
        });
    }
})();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});