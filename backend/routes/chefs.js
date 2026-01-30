const express = require('express');
const { getAllChefs, addChef } = require('../controllers/chefController');

const router = express.Router();

// GET /api/chefs
router.get('/', getAllChefs);

// POST /api/chefs
router.post('/', addChef);

module.exports = router;