const mongoose = require('mongoose');

// Booking Schema for MongoDB
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    required: true
  },
  specialRequests: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);