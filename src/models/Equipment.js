const mongoose = require('mongoose');

// Define the equipment schema
const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming there's a User model to reference
    required: true
  }
}, { timestamps: true });

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
