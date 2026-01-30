const express = require('express');
const { createBooking } = require('../controllers/bookingController');

const router = express.Router();

// POST /api/bookings
router.post('/', createBooking);

module.exports = router;