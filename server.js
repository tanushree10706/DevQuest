/* ===================================
   DevQuest — server.js
   Main Express application entry point
   =================================== */

require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 5000;

// ========================
// MIDDLEWARE
// ========================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// API ROUTES (must come before static)
// ========================
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevQuest API is running 🚀' });
});

// ========================
// SERVE FRONTEND (static files from root)
// ========================
app.use(express.static(path.join(__dirname)));

// SPA fallback — only for non-API routes
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ========================
// DATABASE + START
// ========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 DevQuest running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
