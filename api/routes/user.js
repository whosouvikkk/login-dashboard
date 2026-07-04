const express = require('express');
const { protect } = require('../middleware/auth');
const connectDB = require('../config/db');

const router = express.Router();

// @route GET /api/dashboard
router.get('/dashboard', protect, async (req, res) => {
  res.json({
    welcomeMessage: `Welcome back, ${req.user.username}`,
    credits: req.user.credits,
    role: req.user.role,
    stats: { activeServices: 3, systemStatus: 'Online' }
  });
});

// @route GET /api/user/profile
router.get('/profile', protect, async (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    credits: req.user.credits,
    role: req.user.role,
    createdAt: req.user.createdAt,
    lastLogin: req.user.lastLogin
  });
});

// @route GET /api/user/credits
router.get('/credits', protect, async (req, res) => {
  res.json({ credits: req.user.credits });
});

// @route GET /api/services
router.get('/services', protect, async (req, res) => {
  res.json([
    { id: '1', name: 'Service One', description: 'AI-powered data synthesis and deep predictive analytics engine.', status: 'Online', route: '/dashboard/services/1' },
    { id: '2', name: 'Service Two', description: 'Automated workflow orchestration and cloud infrastructure scaler.', status: 'Online', route: '/dashboard/services/2' },
    { id: '3', name: 'Service Three', description: 'Real-time cryptographic verification and secure vault storage.', status: 'Online', route: '/dashboard/services/3' }
  ]);
});

module.exports = router;
