const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./src/middleware/errorMiddleware');
const projectRouter = require('./src/routes/projectRoutes');
const authRouter = require('./src/routes/authRoutes');
const messageRouter = require('./src/routes/messageRoutes');
const portfolioRouter = require('./src/routes/portfolioRoutes');

// ...

console.log('[DEBUG] Mounting auth routes...');
app.use('/api/projects', projectRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/portfolio', portfolioRouter);

// Routes (We will link these next)
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Portfolio Backend is running!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' });
});

app.get('/favicon.ico', (req, res) => res.status(204));

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