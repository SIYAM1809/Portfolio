const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./src/middleware/errorMiddleware');
const projectRouter = require('./src/routes/projectRoutes');
const authRouter = require('./src/routes/authRoutes');
const messageRouter = require('./src/routes/messageRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://portfolio-frontend.vercel.app',
    'https://portfolio-git-main-md-aman-uddin-siyams-projects.vercel.app',
    'https://portfolio-8uz28qfu7-md-aman-uddin-siyams-projects.vercel.app',
    'https://portfolio-md-aman-uddin-siyams-projects.vercel.app',
    'https://portfolio-sable-kappa-71.vercel.app'
  ],
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