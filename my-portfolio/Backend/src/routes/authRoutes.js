const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

console.log('[DEBUG] Loading authRoutes...');

router.get('/ping', (req, res) => res.json({ status: 'success', message: 'pong' }));

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', (req, res, next) => {
    console.log('[DEBUG] Hit /verify route');
    next();
}, protect, authController.verify);

module.exports = router;
