/* ===================================
   DevQuest — routes/users.js
   All authenticated user routes
   =================================== */

const express = require('express');
const protect = require('../middleware/auth');
const router  = express.Router();

const VALID_WORLDS = ['html', 'css', 'js', 'os', 'algo', 'ct', 'stats'];
const XP_PER_QUEST = 10;

/* GET /api/me — get current user profile */
router.get('/me', protect, async (req, res) => {
  const u = req.user;
  res.json({
    user: {
      username: u.username,
      email:    u.email,
      xp:       u.xp,
      level:    u.level,
      streak:   u.streak,
      quests:   u.quests,
      activity: u.activity,
    },
  });
});

/* GET /api/tasks — get quest completion state */
router.get('/tasks', protect, async (req, res) => {
  const u = req.user;
  res.json({
    data: {
      quests:   u.quests,
      xp:       u.xp,
      level:    u.level,
      streak:   u.streak,
      username: u.username,
      activity: u.activity,
    },
  });
});

/* PUT /api/complete/:world/:index — toggle quest completion */
router.put('/complete/:world/:index', protect, async (req, res) => {
  try {
    const { world, index } = req.params;
    const idx  = parseInt(index, 10);
    const user = req.user;

    if (!VALID_WORLDS.includes(world))
      return res.status(400).json({ message: `Invalid world: ${world}` });
    if (isNaN(idx) || idx < 0 || idx > 9)
      return res.status(400).json({ message: `Invalid quest index: ${index}` });

    const wasCompleted = user.quests[world][idx];
    const nowCompleted = !wasCompleted;

    user.quests[world][idx] = nowCompleted;
    user.xp    = nowCompleted ? user.xp + XP_PER_QUEST : Math.max(0, user.xp - XP_PER_QUEST);
    user.level = user.calcLevel();
    user.markModified('quests');

    let activity = null;
    if (nowCompleted) {
      const worldNames = { html:'HTML', css:'CSS', js:'JavaScript', os:'Operating Systems', algo:'Algorithms', ct:'Critical Thinking', stats:'Stats & DS' };
      activity = {
        text: `Completed a quest in ${worldNames[world] || world.toUpperCase()}`,
        xp:   XP_PER_QUEST,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      user.activity.unshift(activity);
      if (user.activity.length > 20) user.activity.pop();
      user.markModified('activity');
    }

    await user.save();

    res.json({
      toggled:  nowCompleted,
      xp:       user.xp,
      level:    user.level,
      activity: activity,
    });
  } catch (err) {
    console.error('Complete quest error:', err.message);
    res.status(500).json({ message: err.message || 'Server error.' });
  }
});

/* PUT /api/me/username — update username */
router.put('/me/username', protect, async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || username.length < 3 || username.length > 20)
      return res.status(400).json({ message: 'Username must be 3–20 characters.' });

    req.user.username = username;
    await req.user.save();
    res.json({ user: { username: req.user.username } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE /api/me/reset — reset all progress */
router.delete('/me/reset', protect, async (req, res) => {
  try {
    const u = req.user;
    u.xp       = 0;
    u.level    = 1;
    u.streak   = 0;
    u.activity = [];
    VALID_WORLDS.forEach(w => { u.quests[w] = new Array(10).fill(false); });
    u.markModified('quests');
    u.markModified('activity');
    await u.save();
    res.json({ message: 'Progress reset successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
