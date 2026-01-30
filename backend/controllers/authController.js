const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import both in-memory data and MongoDB models
const { users, userIdCounter } = require('../models/data');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'homechef_secret_key';

// Toggle between in-memory and MongoDB (set to false for in-memory if MongoDB not running)
const USE_MONGODB = true;

// ===========================================
// REGISTER USER
// ===========================================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (USE_MONGODB) {
      // MongoDB version
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      });
    } else {
      // In-memory version
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: userIdCounter++,
        name,
        email,
        password: hashedPassword
      };
      users.push(newUser);

      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET);
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// ===========================================
// LOGIN USER
// ===========================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (USE_MONGODB) {
      // MongoDB version
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      // In-memory version
      const user = users.find(user => user.email === email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { register, login };