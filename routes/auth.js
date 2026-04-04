/* ===================================
   DevQuest — routes/auth.js
   POST /api/register, POST /api/login
   =================================== */

const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const router  = express.Router();

/* POST /api/register */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (exists) {
      const field = exists.email === email.toLowerCase() ? 'Email' : 'Username';
      return res.status(400).json({ message: `${field} is already taken.` });
    }

    const user = new User({ username, email, password });
    try { user.updateStreak(); } catch(e) {}
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.status(201).json({
      token,
      user: {
        username: user.username,
        xp:       user.xp,
        level:    user.level,
        streak:   user.streak,
        quests:   user.quests,
        activity: user.activity,
      },
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: err.message || 'Server error during registration.' });
  }
});

/* POST /api/login */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password.' });

    user.updateStreak();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.json({
      token,
      user: {
        username: user.username,
        xp:       user.xp,
        level:    user.level,
        streak:   user.streak,
        quests:   user.quests,
        activity: user.activity,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: err.message || 'Server error during login.' });
  }
});

module.exports = router;
