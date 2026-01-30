const mongoose = require('mongoose');
require('dotenv').config();
const Chef = require('./models/Chef');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homechef');
    console.log('MongoDB Connected for adding index chefs');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Index.html chefs data
const indexChefs = [
  {
    name: "Sumit Kumar",
    specialization: "Multi-Cuisine",
    experience: 10
  },
  {
    name: "Sunita Singh", 
    specialization: "North Indian Cuisine",
    experience: 3
  },
  {
    name: "Soniya Bansal",
    specialization: "Punjabi Cuisine", 
    experience: 7
  },
  {
    name: "Alisha",
    specialization: "Continental Cuisine",
    experience: 5
  }
];

// Add index chefs
const addIndexChefs = async () => {
  try {
    // Check and add each chef if not exists
    for (const chefData of indexChefs) {
      const existingChef = await Chef.findOne({ name: chefData.name });
      if (!existingChef) {
        const chef = new Chef(chefData);
        await chef.save();
        console.log(`✅ Added chef: ${chefData.name}`);
      } else {
        console.log(`⚠️ Chef already exists: ${chefData.name}`);
      }
    }
    
    console.log('\n🎉 Index chefs sync completed!');
    
  } catch (error) {
    console.error('Error adding index chefs:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
const runScript = async () => {
  console.log('👨🍳 Adding index.html chefs to database...\n');
  await connectDB();
  await addIndexChefs();
};

runScript();