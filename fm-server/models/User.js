const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: String,
  email: String,
  fullName: Object,
  password: String,
  phNo: Number,
  type: String
});

module.exports = mongoose.model('User', userSchema, 'Users');