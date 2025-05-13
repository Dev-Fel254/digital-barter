const Item = require('../models/Item');

// @desc    Create new item
// @route   POST /api/items
// @access  Private
exports.createItem = async (req, res) => {
    try {
        const newItem = new Item({
            ...req.body,
            user: req.user._id
        });
        
        const savedItem = await newItem.save();
        
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating item',
            error: error.message
        });
    }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate('user', 'firstName lastName username location rating profilePicture isOnline')
            .sort('-createdAt');

        res.json(items);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching items',
            error: error.message
        });
    }
};

// @desc    Get recent items with pagination
// @route   GET /api/items/recent
// @access  Public
exports.getRecentItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const items = await Item.find()
            .populate('user', 'firstName lastName username location rating profilePicture isOnline')
            .sort('-createdAt')
            .skip(skip)
            .limit(limit);
            
        const total = await Item.countDocuments();
        
        res.json({
            items,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                hasMore: page < Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching recent items',
            error: error.message
        });
    }
};

// @desc    Get user items
// @route   GET /api/items/myitems
// @access  Private
exports.getUserItems = async (req, res) => {
    try {
        const items = await Item.find({ user: req.user._id })
            .sort('-createdAt');

        res.json(items);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching your items',
            error: error.message
        });
    }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('user', 'firstName lastName username location rating profilePicture isOnline');

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching item',
            error: error.message
        });
    }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
exports.updateItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Make sure user owns item
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(item);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating item',
            error: error.message
        });
    }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Make sure user owns item
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Item.deleteOne({ _id: req.params.id });

        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting item',
            error: error.message
        });
    }
};