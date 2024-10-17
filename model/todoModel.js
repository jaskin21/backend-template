const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
    trim: true, // Remove whitespace from both ends
  },
  description: {
    type: String,
    trim: true, // Remove whitespace from both ends
  },
  completed: {
    type: Boolean,
    default: false, // Defaults to false, meaning not completed
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default date to the current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Set the default date to the current date
  },
});

// Middleware to update the updatedAt field before saving
todoSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); // Update the updatedAt field
  next();
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Export the Todo model
module.exports = Todo;
