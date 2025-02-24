const Trade = require('../models/Trade');
const Item = require('../models/Item');

// @desc    Create new trade
// @route   POST /api/trades
// @access  Private
exports.createTrade = async (req, res) => {
    try {
        const { offeredItemId, requestedItemId, message } = req.body;

        // Get the requested item to check ownership
        const requestedItem = await Item.findById(requestedItemId);
        if (!requestedItem) {
            return res.status(404).json({ message: 'Requested item not found' });
        }

        // Create trade
        const trade = new Trade({
            initiator: req.user._id,
            receiver: requestedItem.user,
            offeredItem: offeredItemId,
            requestedItem: requestedItemId,
            messages: [{
                sender: req.user._id,
                content: message || 'Interested in trading!'
            }]
        });

        const savedTrade = await trade.save();

        // Populate the trade with item and user details
        const populatedTrade = await Trade.findById(savedTrade._id)
            .populate('initiator', 'username location')
            .populate('receiver', 'username location')
            .populate('offeredItem', 'title images')
            .populate('requestedItem', 'title images');

        res.status(201).json(populatedTrade);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating trade',
            error: error.message
        });
    }
};

// @desc    Get user's trades
// @route   GET /api/trades
// @access  Private
exports.getTrades = async (req, res) => {
    try {
        const trades = await Trade.find({
            $or: [
                { initiator: req.user._id },
                { receiver: req.user._id }
            ]
        })
        .populate('initiator', 'username location')
        .populate('receiver', 'username location')
        .populate('offeredItem', 'title images')
        .populate('requestedItem', 'title images')
        .sort('-createdAt');

        res.json(trades);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching trades',
            error: error.message
        });
    }
};

// @desc    Get single trade
// @route   GET /api/trades/:id
// @access  Private
exports.getTrade = async (req, res) => {
    try {
        const trade = await Trade.findById(req.params.id)
            .populate('initiator', 'username location')
            .populate('receiver', 'username location')
            .populate('offeredItem', 'title images description')
            .populate('requestedItem', 'title images description')
            .populate('messages.sender', 'username');

        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        // Check if user is part of the trade
        if (trade.initiator._id.toString() !== req.user._id.toString() && 
            trade.receiver._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(trade);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching trade',
            error: error.message
        });
    }
};

// @desc    Update trade status
// @route   PUT /api/trades/:id
// @access  Private
exports.updateTradeStatus = async (req, res) => {
    try {
        const { status, meetupLocation, meetupTime, message } = req.body;
        
        // Create update object
        const updateObj = {
            status: status
        };

        if (meetupLocation) updateObj.meetupLocation = meetupLocation;
        if (meetupTime) updateObj.meetupTime = meetupTime;
        if (status === 'Completed') updateObj.completedAt = Date.now();

        // Find trade first to check authorization
        const trade = await Trade.findById(req.params.id);
        
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        // Check if user is part of the trade
        if (trade.initiator.toString() !== req.user._id.toString() && 
            trade.receiver.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update trade
        if (message) {
            trade.messages.push({
                sender: req.user._id,
                content: message
            });
        }

        Object.assign(trade, updateObj);
        await trade.save();

        // Populate and return updated trade
        const updatedTrade = await Trade.findById(req.params.id)
            .populate('initiator', 'username location')
            .populate('receiver', 'username location')
            .populate('offeredItem', 'title images description')
            .populate('requestedItem', 'title images description')
            .populate('messages.sender', 'username');

        res.json(updatedTrade);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating trade',
            error: error.message
        });
    }
};

// @desc    Add message to trade
// @route   POST /api/trades/:id/messages
// @access  Private
exports.addMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const trade = await Trade.findById(req.params.id);

        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        // Check if user is part of the trade
        if (trade.initiator.toString() !== req.user._id.toString() && 
            trade.receiver.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        trade.messages.push({
            sender: req.user._id,
            content: message
        });

        await trade.save();

        // Populate and return
        const populatedTrade = await Trade.findById(trade._id)
            .populate('initiator', 'username location')
            .populate('receiver', 'username location')
            .populate('offeredItem', 'title images')
            .populate('requestedItem', 'title images')
            .populate('messages.sender', 'username');

        res.json(populatedTrade);
    } catch (error) {
        res.status(400).json({
            message: 'Error adding message',
            error: error.message
        });
    }
};