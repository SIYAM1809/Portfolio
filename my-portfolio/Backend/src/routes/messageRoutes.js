const express = require('express');
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .post(messageController.sendMessage)
    .get(protect, messageController.getAllMessages);

router
    .route('/:id')
    .delete(protect, messageController.deleteMessage);

module.exports = router;