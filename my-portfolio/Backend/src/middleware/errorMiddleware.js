module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Professional Neon Minimal Error Logging
  console.log(`[ERROR ❌] ${err.message}`);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};