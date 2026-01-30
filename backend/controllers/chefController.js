// Import both in-memory data and MongoDB models
const { chefs, chefIdCounter } = require('../models/data');
const Chef = require('../models/Chef');

// Toggle between in-memory and MongoDB
const USE_MONGODB = true;

// ===========================================
// GET ALL CHEFS
// ===========================================
const getAllChefs = async (req, res) => {
  try {
    if (USE_MONGODB) {
      // MongoDB version
      const chefs = await Chef.find();
      res.json(chefs);
    } else {
      // In-memory version
      res.json(chefs);
    }
  } catch (error) {
    console.error('Get chefs error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
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