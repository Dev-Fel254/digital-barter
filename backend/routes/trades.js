const express = require('express');
const router = express.Router();
const {
    createTrade,
    getTrades,
    getTrade,
    updateTradeStatus,
    addMessage
} = require('../controllers/tradeController');
const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, createTrade)
    .get(protect, getTrades);

router.route('/:id')
    .get(protect, getTrade)
    .put(protect, updateTradeStatus);

router.post('/:id/messages', protect, addMessage);

module.exports = router;