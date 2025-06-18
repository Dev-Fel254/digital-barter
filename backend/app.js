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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Connect to MongoDB
(async () => {
    const dbConnected = await connectDB();
    
    if (dbConnected) {
        console.log('Database connected successfully');
        // Only register database-dependent routes if connected
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/items', require('./routes/items'));
        app.use('/api/trades', require('./routes/trades'));
    } else {
        console.log('Database connection failed, using mock responses');
        // Provide mock responses for essential routes when DB is unavailable
        app.post('/api/auth/login', (req, res) => {
            res.json({ 
                token: 'mock-token-for-development',
                _id: '123456789',
                firstName: 'Test',
                lastName: 'User',
                email: req.body.username || 'test@example.com'
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

        // Mock items endpoints
        let mockItems = [
            {
                _id: '1',
                title: 'Sample Item 1',
                description: 'This is a sample item for testing',
                category: 'Electronics',
                condition: 'New',
                images: ['https://via.placeholder.com/300x200?text=Sample+Item+1'],
                estimatedValue: 100,
                location: 'Test Location',
                user: {
                    _id: '123456789',
                    firstName: 'Test',
                    lastName: 'User',
                    username: 'testuser',
                    location: 'Test Location',
                    rating: 5,
                    profilePicture: null,
                    isOnline: true
                },
                createdAt: new Date(),
                status: 'Available'
            }
        ];

        app.get('/api/items', (req, res) => {
            res.json(mockItems);
        });

        app.get('/api/items/recent', (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            res.json({
                items: mockItems,
                pagination: {
                    currentPage: page,
                    totalPages: 1,
                    totalItems: mockItems.length,
                    hasMore: false
                }
            });
        });

        app.post('/api/items', (req, res) => {
            const newItem = {
                _id: Date.now().toString(),
                ...req.body,
                user: {
                    _id: '123456789',
                    firstName: 'Test',
                    lastName: 'User',
                    username: 'testuser',
                    location: 'Test Location',
                    rating: 5,
                    profilePicture: null,
                    isOnline: true
                },
                createdAt: new Date(),
                status: 'Available'
            };
            
            mockItems.unshift(newItem);
            res.status(201).json(newItem);
        });

        app.get('/api/items/myitems', (req, res) => {
            res.json(mockItems.filter(item => item.user._id === '123456789'));
        });
    }
})();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something broke!', 
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});