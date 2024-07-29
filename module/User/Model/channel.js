const mongoose = require('mongoose');


// Define Mongoose Schema
const channelSchema = new mongoose.Schema({
  name: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Create Mongoose Model
const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;