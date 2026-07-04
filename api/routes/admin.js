const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');
const connectDB = require('../config/db');

const router = express.Router();

router.use(protect, admin);

// @route GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    await connectDB();
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// @route GET /api/admin/user/:id
router.get('/user/:id', async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// @route PUT /api/admin/user/:id/credits
router.put('/user/:id/credits', async (req, res) => {
  try {
    await connectDB();
    const { amount, action } = req.body; // action: 'add' | 'remove'
    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid positive credit amount' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (action === 'add') {
      user.credits += numAmount;
    } else if (action === 'remove') {
      user.credits = Math.max(0, user.credits - numAmount); // Prevent negative balance
    } else {
      return res.status(400).json({ message: 'Invalid action type' });
    }

    await user.save();
    res.json({ id: user._id, credits: user.credits });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update credits' });
  }
});

// @route PUT /api/admin/user/:id
router.put('/user/:id', async (req, res) => {
  try {
    await connectDB();
    const { username, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    const updated = await User.findById(req.params.id).select('-password');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// @route DELETE /api/admin/user/:id
router.delete('/user/:id', async (req, res) => {
  try {
    await connectDB();
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
