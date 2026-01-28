const jwt = require('jsonwebtoken');

/**
 * Protect Middleware
 * Validates JWT token and attaches user to request object
 * Ensures only authenticated users can access protected routes
 */
exports.protect = async (req, res, next) => {
    try {
        let token;

        // 1) Extract token from Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // 2) Check if token exists
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Please log in to access this resource.'
            });
        }

        // 3) Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4) Check if user still exists
        const currentUser = await require('../models/User').findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer does exist.'
            });
        }

        // 5) Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        // Handle JWT-specific errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid token. Please log in again.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Your token has expired. Please log in again.'
            });
        }

        // Generic error
        return res.status(401).json({
            status: 'fail',
            message: 'Authentication failed.'
        });
    }
};

/**
 * Optional: Restrict to specific roles
 * Usage: router.delete('/projects/:id', protect, restrictTo('admin'), deleteProject)
 */
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action.'
            });
        }
        next();
    };
};
