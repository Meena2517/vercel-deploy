const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config();  
const connect = () => {
  const url = process.env.MONGODB_URL;
  
  mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000 
  })
      .then(() => {
          console.info("Connected to the DB")
      })
      .catch((e) => {
          console.log("Error", e);
      })
  }
  
  module.exports = { connect };


