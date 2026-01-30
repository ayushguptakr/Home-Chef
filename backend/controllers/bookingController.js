// Import both in-memory data and MongoDB models
const { bookings, bookingIdCounter } = require('../models/data');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Chef = require('../models/Chef');

// Toggle between in-memory and MongoDB
const USE_MONGODB = false;

// ===========================================
// CREATE BOOKING
// ===========================================
const createBooking = async (req, res) => {
  try {
    const { userId, chefId, date, time } = req.body;

    if (USE_MONGODB) {
      // MongoDB version
      const newBooking = new Booking({ userId, chefId, date, time });
      await newBooking.save();
      
      // Populate user and chef details
      const populatedBooking = await Booking.findById(newBooking._id)
        .populate('userId', 'name email')
        .populate('chefId', 'name specialization');

      res.status(201).json({
        message: 'Booking created successfully',
        booking: populatedBooking
      });
    } else {
      // In-memory version
      const newBooking = {
        id: bookingIdCounter++,
        userId,
        chefId,
        date,
        time,
        createdAt: new Date().toISOString()
      };
      bookings.push(newBooking);

      res.status(201).json({
        message: 'Booking created successfully',
        booking: newBooking
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBooking };