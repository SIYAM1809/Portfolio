const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public routes
router.get('/', portfolioController.getPortfolioContent);

// Protected routes (Admin only)
router.post('/seed', protect, restrictTo('admin'), portfolioController.seedPortfolioContent);
router.put('/', protect, restrictTo('admin'), portfolioController.updatePortfolioContent);

module.exports = router;
