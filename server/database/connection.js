require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
  init() {
    mongoose.connect(process.env.MONG_URL, (err) => { 
      if (err) throw err;
      else console.log('Connected to mongoose DB');
    });
  }
};