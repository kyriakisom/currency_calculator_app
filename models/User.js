const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define the user schema for authentication and authorization
const userSchema = new Schema({
  username: { 
    type: String, 
    required: true            // Must be provided
  },
  fullname: { 
    type: String, 
    required: true            // Full name of the user
  },
  email: { 
    type: String, 
    required: true, 
    unique: true              // Email must be unique across all users
  },
  password: {
    type: String,
    required: true            // Stored as a hashed string (see pre-save hook below)
  },
  role: { 
    type: String, 
    required: true, 
    enum: ['User', 'Admin']   // Only two valid roles allowed
  },
  adminAccessCode: { 
    type: String, 
    required: function() { 
      return this.role === 'Admin'; 
    } // Only required if the user is an Admin
  }
});

// Middleware to hash the password before saving the user document
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);            // Generate salt
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
      next();
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
  } else {
    next(); // Continue without modifying password
  }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the model to use in other parts of the app
