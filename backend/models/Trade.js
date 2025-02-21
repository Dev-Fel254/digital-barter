const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    offeredItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    requestedItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    initiatorConfirmed: {
        type: Boolean,
        default: false
    },
    receiverConfirmed: {
        type: Boolean,
        default: false
    },
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    meetupLocation: {
        type: String
    },
    meetupTime: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;