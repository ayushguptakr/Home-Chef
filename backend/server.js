const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const chefRoutes = require('./routes/chefs');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = 5000;

// ===========================================
// DATABASE CONNECTION (MongoDB)
// ===========================================
// Uncomment the line below to connect to MongoDB
// connectDB();

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

// ===========================================
// START SERVER
// ===========================================
app.listen(PORT, () => {
  console.log(`🚀 HomeChef Backend Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
});