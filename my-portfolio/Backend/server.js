const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.js');

dotenv.config();

// Initialize DB Connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
});