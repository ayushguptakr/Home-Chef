const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const chefRoutes = require('./routes/chefs');
const bookingRoutes = require('./routes/bookings');

console.log('Routes imported successfully');

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;

// ===========================================
// MIDDLEWARE
// ===========================================
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse JSON requests

// ===========================================
// API ROUTES
// ===========================================
app.use('/api/users', authRoutes);     // User authentication
app.use('/api/chefs', chefRoutes);     // Chef management
app.use('/api/bookings', bookingRoutes); // Booking system

console.log('Routes mounted successfully');

// ===========================================
// BASIC ROUTE
// ===========================================
app.get('/', (req, res) => {
  res.json({ 
    message: 'HomeChef Backend API is running!',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      getChefs: 'GET /api/chefs',
      addChef: 'POST /api/chefs',
      createBooking: 'POST /api/bookings'
    }
  });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// ===========================================
// START SERVER
// ===========================================
console.log('Starting server...');
try {
  const server = app.listen(PORT, () => {
    console.log(`🚀 HomeChef Backend Server running on port ${PORT}`);
    console.log(`📍 API Base URL: http://localhost:${PORT}`);
    console.log(`📍 Also accessible at: http://127.0.0.1:${PORT}`);
    console.log('Server started successfully!');
    
    // Connect to database after server starts
    connectDB();
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error);
  });
  
  server.on('listening', () => {
    console.log('Server is now listening on port', PORT);
    // Keep the server running
    setInterval(() => {
      console.log('Server is still running...');
    }, 30000); // Log every 30 seconds
  });
} catch (error) {
  console.error('Failed to start server:', error);
}