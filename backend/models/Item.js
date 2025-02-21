const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Electronics', 'Clothing', 'Books', 'Sports', 'Home', 'Other']
    },
    condition: {
        type: String,
        required: [true, 'Please select item condition'],
        enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
    },
    images: [{
        type: String,
        required: [true, 'Please add at least one image']
    }],
    estimatedValue: {
        type: Number,
        required: [true, 'Please add an estimated value']
    },
    wishlist: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['Available', 'Pending', 'Traded'],
        default: 'Available'
    },
    location: {
        type: String,
        required: [true, 'Please add your location']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add index for better search performance
itemSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Item', itemSchema);