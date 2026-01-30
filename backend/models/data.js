// ===========================================
// IN-MEMORY STORAGE (for development/testing)
// ===========================================
let users = [];
let chefs = [
  {
    id: 1,
    name: "Marco Rodriguez",
    specialization: "Italian Cuisine",
    experience: 8
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialization: "Asian Fusion",
    experience: 6
  },
  {
    id: 3,
    name: "David Thompson",
    specialization: "French Cuisine",
    experience: 12
  },
  {
    id: 4,
    name: "Priya Sharma",
    specialization: "Indian Cuisine",
    experience: 5
  }
];
let bookings = [];

// Counters for IDs
let userIdCounter = 1;
let chefIdCounter = 5;
let bookingIdCounter = 1;

module.exports = {
  users,
  chefs,
  bookings,
  get userIdCounter() { return userIdCounter++; },
  get chefIdCounter() { return chefIdCounter++; },
  get bookingIdCounter() { return bookingIdCounter++; }
};