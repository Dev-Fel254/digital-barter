const express = require('express');
const router = express.Router();
const {
    createItem,
    getItems,
    getRecentItems,
    getUserItems,
    getItem,
    updateItem,
    deleteItem
} = require('../controllers/itemController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getItems)
    .post(protect, createItem);

router.get('/recent', getRecentItems);
router.get('/myitems', protect, getUserItems);

router.route('/:id')
    .get(getItem)
    .put(protect, updateItem)
    .delete(protect, deleteItem);

module.exports = router;