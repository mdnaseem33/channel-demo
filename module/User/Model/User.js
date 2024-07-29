const mongoose = require('mongoose');

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  user_type: { type: String, required: true }, 
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  channel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' } // Reference to User model
});

// Create Mongoose Model
const User = mongoose.model('User', userSchema);

module.exports = User;