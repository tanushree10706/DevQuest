const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    password: { type: String, required: true, minlength: 6, select: false },
    xp:            { type: Number, default: 0 },
    level:         { type: Number, default: 1 },
    streak:        { type: Number, default: 0 },
    lastLoginDate: { type: String, default: null },

    // 7 worlds — each with 10 quests
    quests: {
      html:  { type: [Boolean], default: () => new Array(10).fill(false) },
      css:   { type: [Boolean], default: () => new Array(10).fill(false) },
      js:    { type: [Boolean], default: () => new Array(10).fill(false) },
      os:    { type: [Boolean], default: () => new Array(10).fill(false) },
      algo:  { type: [Boolean], default: () => new Array(10).fill(false) },
      ct:    { type: [Boolean], default: () => new Array(10).fill(false) },
      stats: { type: [Boolean], default: () => new Array(10).fill(false) },
    },

    activity: {
      type: [{ text: String, xp: Number, time: String }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.calcLevel = function () {
  return Math.floor(this.xp / 100) + 1;
};

userSchema.methods.updateStreak = function () {
  const todayStr  = new Date().toDateString();
  if (this.lastLoginDate === todayStr) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  this.streak = (this.lastLoginDate === yesterday.toDateString()) ? this.streak + 1 : 1;
  this.lastLoginDate = todayStr;
};

module.exports = mongoose.model('User', userSchema);
