// Import both in-memory data and MongoDB models
const { chefs, chefIdCounter } = require('../models/data');
const Chef = require('../models/Chef');

// Toggle between in-memory and MongoDB
const USE_MONGODB = false;

// ===========================================
// GET ALL CHEFS
// ===========================================
const getAllChefs = async (req, res) => {
  try {
    if (USE_MONGODB) {
      // MongoDB version
      const chefs = await Chef.find();
      res.json({
        message: 'Chefs retrieved successfully',
        chefs
      });
    } else {
      // In-memory version
      res.json({
        message: 'Chefs retrieved successfully',
        chefs
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================================
// ADD NEW CHEF
// ===========================================
const addChef = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;

    if (USE_MONGODB) {
      // MongoDB version
      const newChef = new Chef({ name, specialization, experience });
      await newChef.save();
      res.status(201).json({
        message: 'Chef added successfully',
        chef: newChef
      });
    } else {
      // In-memory version
      const newChef = {
        id: chefIdCounter++,
        name,
        specialization,
        experience
      };
      chefs.push(newChef);
      res.status(201).json({
        message: 'Chef added successfully',
        chef: newChef
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllChefs, addChef };