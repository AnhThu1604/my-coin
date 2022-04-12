const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI||'mongodb+srv://my-coin:1234567890@cluster0.8vo6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    console.log(`Successfully connected to MongoDB`);
  } catch (error) {
    console.log('Error with MongoDB connection: ', error.message);
  }
};

module.exports = connectDB;