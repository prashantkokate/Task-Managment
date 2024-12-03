
const mongoose = require('mongoose'); 

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

module.exports = {
  connectToDatabase
}

