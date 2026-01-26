const Message = require('../models/Message');

exports.sendMessage = async (req, res, next) => {
    try {
        const newMessage = await Message.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Your message has been sent successfully!',
            data: { message: newMessage }
        });
    } catch (err) {
        next(err); // Passes error to our global error middleware
    }
};

// For your Admin Dashboard later
exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort('-createdAt');
        res.status(200).json({ status: 'success', results: messages.length, data: { messages } });
    } catch (err) { next(err); }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (err) { next(err); }
};