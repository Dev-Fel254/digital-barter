/**
 * Database Integration Test Script
 * This script tests the MongoDB Atlas connection and basic CRUD operations
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Item = require('./models/Item');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Create a test user
const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return existingUser;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Test@123', salt);

    // Create new user
    const user = new User({
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      phone: '+1234567890',
      location: 'Test City',
      isOnline: true
    });

    await user.save();
    console.log('Test user created successfully');
    return user;
  } catch (error) {
    console.error(`Error creating test user: ${error.message}`);
    return null;
  }
};

// Create a test item
const createTestItem = async (userId) => {
  try {
    // Create new item
    const item = new Item({
      title: 'Test Item',
      description: 'This is a test item created by the test script',
      category: 'Electronics',
      condition: 'New',
      estimatedValue: 100, // Adding the required estimatedValue field
      images: ['https://via.placeholder.com/300'],
      user: userId,
      location: 'Test City',
      tags: ['test', 'electronics'],
      type: 'swap'
    });

    await item.save();
    console.log('Test item created successfully');
    return item;
  } catch (error) {
    console.error(`Error creating test item: ${error.message}`);
    return null;
  }
};

// Get recent items with user information
const getRecentItems = async () => {
  try {
    const items = await Item.find()
      .populate('user', 'firstName lastName username location rating profilePicture isOnline')
      .sort('-createdAt')
      .limit(10);

    console.log('Recent items:');
    items.forEach(item => {
      console.log(`- ${item.title} (Posted by: ${item.user.firstName} ${item.user.lastName}, Online: ${item.user.isOnline})`);
    });

    return items;
  } catch (error) {
    console.error(`Error fetching recent items: ${error.message}`);
    return [];
  }
};

// Run tests
const runTests = async () => {
  // Connect to database
  const connected = await connectDB();
  if (!connected) return;

  // Create test user
  const user = await createTestUser();
  if (!user) return;

  // Create test item
  const item = await createTestItem(user._id);
  if (!item) return;

  // Get recent items
  await getRecentItems();

  // Disconnect from database
  await mongoose.disconnect();
  console.log('Tests completed successfully');
};

// Run the tests
runTests();
