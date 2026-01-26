const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./src/middleware/errorMiddleware');
const projectRouter = require('./src/routes/projectRoutes');
const authRouter = require('./src/routes/authRoutes');
const messageRouter = require('./src/routes/messageRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://portfolio-frontend.vercel.app'], // Replace with your actual Vercel URL after deployment
  credentials: true
}));
app.use(express.json());

// Debug Middleware
app.use((req, res, next) => {
  console.log(`[DEBUG] Request: ${req.method} ${req.originalUrl}`);
  next();
});

console.log('[DEBUG] Mounting auth routes...');
app.use('/api/projects', projectRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

// Routes (We will link these next)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' });
});

// 404 Handler
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

// Global Error Middleware
app.use(globalErrorHandler);

module.exports = app;