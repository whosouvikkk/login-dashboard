const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');
const connectDB = require('../config/db');

const router = express.Router();

router.use(protect, admin);

/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
*/
router.get('/users', async (req, res) => {
  try {
    await connectDB();

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Failed to fetch users',
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET SINGLE USER
|--------------------------------------------------------------------------
*/
router.get('/user/:id', async (req, res) => {
  try {
    await connectDB();

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Failed to fetch user',
    });
  }
});

/*
|--------------------------------------------------------------------------
| ADD / REMOVE CREDITS
|--------------------------------------------------------------------------
*/
router.put('/user/:id/credits', async (req, res) => {
  try {
    await connectDB();

    const { amount, action } = req.body;

    const credits = Number(amount);

    if (isNaN(credits) || credits <= 0) {
      return res.status(400).json({
        message: 'Invalid credit amount',
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    switch (action) {
      case 'add':
        user.credits += credits;
        break;

      case 'remove':
        user.credits = Math.max(
          0,
          user.credits - credits
        );
        break;

      default:
        return res.status(400).json({
          message: 'Invalid action',
        });
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select('-password');

    res.json(updatedUser);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Unable to update credits',
    });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE USER
|--------------------------------------------------------------------------
*/
router.put('/user/:id', async (req, res) => {
  try {
    await connectDB();

    const {
      username,
      email,
      role,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (username !== undefined)
      user.username = username;

    if (email !== undefined)
      user.email = email;

    if (role !== undefined)
      user.role = role;

    await user.save();

    const updated = await User.findById(user._id)
      .select('-password');

    res.json(updated);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Unable to update user',
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE USER
|--------------------------------------------------------------------------
*/
router.delete('/user/:id', async (req, res) => {
  try {
    await connectDB();

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (user.role === 'admin') {
      return res.status(403).json({
        message: 'Admin accounts cannot be deleted.',
      });
    }

    await User.findByIdAndDelete(user._id);

    res.json({
      success: true,
      message: 'User deleted successfully.',
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Unable to delete user.',
    });
  }
});

module.exports = router;
