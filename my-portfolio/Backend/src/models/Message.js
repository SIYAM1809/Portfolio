const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your name'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Please provide your email'],
    lowercase: true
  },
  subject: { type: String, default: 'Portfolio Inquiry' },
  message: { 
    type: String, 
    required: [true, 'Message content cannot be empty'] 
  },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'archived'], 
    default: 'unread' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);