const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middleware/auth');

// Define the specific admin access code
const ADMIN_ACCESS_CODE = 'secretAdminCode'; // Replace this with the actual access code you want

// Password validation regex
const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Register Route
router.post('/register', async (req, res) => {
  const { username, fullname, email, password, role, adminAccessCode } = req.body;

  // Check if all required fields are provided
  if (!username || !fullname || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Validate password structure
  if (!passwordValidationRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
    });
  }

  // If the role is Admin, check if the adminAccessCode is correct
  if (role === 'Admin') {
    if (!adminAccessCode || adminAccessCode !== ADMIN_ACCESS_CODE) {
      return res.status(400).json({ message: 'Invalid admin access code' });
    }
  }

  try {
    // Create a new user
    const newUser = new User({ username, fullname, email, password, role, adminAccessCode });

    // Save the user
    await newUser.save();

    // Return a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Store the user details in the session
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.username = user.username;
      req.session.fullname = user.fullname;
  
      // Return a success response
      res.status(200).json({
        message: 'Login successful',
        user: {
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  });
  // Get User Info Route
router.get('/me',isAuthenticated, async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Please log in to access your information' });
    }
  
    try {
      // Find the user by session userId
      const user = await User.findById(req.session.userId).select('username fullname email role'); // Select only the necessary fields
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's info
      res.status(200).json({
        message: 'User info retrieved successfully',
        user: {
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  });
  
// Update User Info Route
router.put('/me', isAuthenticated, async (req, res) => {
  // Ensure the user is logged in
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Please log in to update your information' });
  }

  const { username, fullname, email } = req.body;

  try {
    // Only update the fields provided
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (fullname !== undefined) updates.fullname = fullname;
    if (email !== undefined) updates.email = email;
   

    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('username fullname email');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User info updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});
// Get only fullname of the authenticated user
router.get('/fullname', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('fullname');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ fullname: user.fullname });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(400).send('Error during logout.');
            } else {
                res.send('Logout successful.');
            }
        });
    } else {
        res.status(400).send('No session found.');
    }
});

module.exports = router;
