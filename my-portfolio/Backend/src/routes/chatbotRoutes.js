const express = require('express');
const chatbotController = require('../controllers/chatbotController');

const router = express.Router();

// POST /api/chatbot/chat
router.post('/chat', chatbotController.chat);

module.exports = router;
