const mongoose = require('mongoose');
require('dotenv').config();
const Chef = require('./models/Chef');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homechef');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Sample chef data
const sampleChefs = [
  {
    name: "Marco Rodriguez",
    specialization: "Italian Cuisine",
    experience: 8
  },
  {
    name: "Sarah Chen",
    specialization: "Asian Fusion",
    experience: 6
  },
  {
    name: "David Thompson",
    specialization: "French Cuisine",
    experience: 12
  },
  {
    name: "Priya Sharma",
    specialization: "Indian Cuisine",
    experience: 5
  },
  {
    name: "Maria Garcia",
    specialization: "Spanish Cuisine",
    experience: 7
  },
  {
    name: "Kenji Tanaka",
    specialization: "Japanese Cuisine",
    experience: 10
  },
  {
    name: "Ahmed Hassan",
    specialization: "Middle Eastern Cuisine",
    experience: 9
  },
  {
    name: "Sophie Laurent",
    specialization: "Mediterranean Cuisine",
    experience: 6
  }
];

// Seed function
const seedChefs = async () => {
  try {
    // Clear existing chefs
    await Chef.deleteMany({});
    console.log('Cleared existing chefs');
    
    // Insert sample chefs
    const createdChefs = await Chef.insertMany(sampleChefs);
    console.log(`✅ Successfully seeded ${createdChefs.length} chefs`);
    
    // Display created chefs
    createdChefs.forEach(chef => {
      console.log(`- ${chef.name} (${chef.specialization}) - ${chef.experience} years`);
    });
    
  } catch (error) {
    console.error('Error seeding chefs:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run seeding
const runSeed = async () => {
  console.log('🌱 Starting database seeding...');
  await connectDB();
  await seedChefs();
};

runSeed();