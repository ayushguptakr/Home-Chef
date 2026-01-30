const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homechef');
    console.log('MongoDB Connected for adding test users');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Test users data
const testUsers = [
  {
    name: "John Doe",
    email: "john@test.com",
    password: "password123"
  },
  {
    name: "Jane Smith", 
    email: "jane@test.com",
    password: "password123"
  },
  {
    name: "Mike Johnson",
    email: "mike@test.com", 
    password: "password123"
  }
];

// Add test users
const addTestUsers = async () => {
  try {
    // Clear existing test users
    await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    console.log('Cleared existing test users');
    
    // Hash passwords and create users
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      });
      
      await user.save();
      console.log(`✅ Created user: ${userData.name} (${userData.email})`);
    }
    
    console.log(`\n🎉 Successfully added ${testUsers.length} test users!`);
    console.log('\nTest Login Credentials:');
    testUsers.forEach(user => {
      console.log(`- Email: ${user.email} | Password: ${user.password}`);
    });
    
  } catch (error) {
    console.error('Error adding test users:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run the script
const runScript = async () => {
  console.log('👥 Adding test users to database...\n');
  await connectDB();
  await addTestUsers();
};

runScript();