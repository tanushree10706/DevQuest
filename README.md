# ⚔️ DevQuest — Gamified Web Dev Learning Platform

> **Learn. Code. Level Up.**  
> Master web development through epic quests, earn XP, and become a dev legend.

---

## 📖 About

DevQuest is a gamified learning platform that turns web development education into an RPG adventure. Users create a hero account, explore subject "Worlds", complete learning quests, and earn XP to level up — all tracked with streaks, achievements, and a live progress dashboard.

---

## ✨ Features

- 🗺️ **7 Learning Worlds** — HTML, CSS, JavaScript, Operating Systems, Algorithms, Critical Thinking, and Stats & DS
- 📜 **70 Quests** — 10 quests per world with detailed topic explanations in a modal popup
- ⚡ **XP & Leveling System** — Earn 10 XP per quest, level up every 100 XP
- 🔥 **Daily Streak Tracking** — Rewards consistent learning habits
- 🏆 **Achievements** — 10 unlockable badges (e.g. Code Knight, Web Wizard, Century Club)
- 📊 **Dashboard** — Live stats: XP bar, level, streak, quests done, recent activity feed
- 👤 **Profile Page** — Per-world progress bars, achievement grid, and title (e.g. "Grand Wizard 🔮")
- 🔐 **Auth System** — JWT-based register/login with bcrypt password hashing
- 📱 **Responsive UI** — Mobile-friendly sidebar with toggle, works across all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| UI Framework | Bootstrap 5.3 + Bootstrap Icons |
| Fonts | Press Start 2P, Rajdhani, Fira Code (Google Fonts) |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Auth | JSON Web Tokens (JWT) + bcryptjs |
| Dev Tools | Nodemon, dotenv |

---

## 📁 Project Structure

```
DevQuest/
├── index.html          # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # User dashboard
├── subjects.html       # Worlds & quests page
├── profile.html        # User profile & achievements
├── style.css           # Global styles
├── server.js           # Express server entry point
├── .env                # Environment variables
├── js/
│   ├── api.js          # Frontend API service layer
│   ├── app.js          # Page logic (dashboard, subjects, profile)
│   ├── xpSystem.js     # XP, leveling, and state management
│   └── navigation.js   # Sidebar, topbar, routing utilities
├── routes/
│   ├── auth.js         # /api/register, /api/login
│   └── users.js        # /api/me, /api/tasks, /api/complete/:world/:index
├── models/
│   └── User.js         # Mongoose user schema
├── middleware/
│   └── auth.js         # JWT protect middleware
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanushree10706/DevQuest.git
   cd DevQuest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   PORT=5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/register` | Register a new user | ❌ |
| POST | `/api/login` | Login and receive JWT | ❌ |
| GET | `/api/me` | Get current user profile | ✅ |
| GET | `/api/tasks` | Get quest completion state | ✅ |
| PUT | `/api/complete/:world/:index` | Toggle a quest as done/undone | ✅ |
| PUT | `/api/me/username` | Update username | ✅ |
| DELETE | `/api/me/reset` | Reset all progress | ✅ |
| GET | `/api/health` | Health check | ❌ |

---

## 🌍 Worlds & Quests

| World | Topics Covered |
|---|---|
| 🌐 HTML Quest | Document Structure, Forms, Tables, Semantic HTML, Accessibility, SEO |
| 🎨 CSS Quest | Flexbox, Grid, Responsive Design, Animations, CSS Variables, Modern CSS |
| ⚡ JS Quest | DOM, Events, Async/Await, Fetch API, Arrays, Classes, Local Storage |
| 💻 Operating Systems | Processes, Memory, File Systems, Scheduling, Concurrency |
| 🧮 Algorithms | Sorting, Searching, Big-O, Recursion, Dynamic Programming |
| 🧠 Critical Thinking | Logic, Problem Decomposition, Debugging Strategies |
| 📊 Stats & DS | Data Structures, Probability, Descriptive Stats |

---

## 🏆 Achievements

| Badge | Condition |
|---|---|
| 🌐 HTML Initiate | Complete first HTML quest |
| 🎨 CSS Artisan | Complete first CSS quest |
| ⚡ JS Spark | Complete first JS quest |
| 🏆 Quest Hunter | Complete 5 quests total |
| 💎 Dedicated Dev | Complete 15 quests total |
| 🔥 On Fire | Reach a 3-day streak |
| ⚔️ Code Knight | Reach Level 5 |
| 🧙 Web Wizard | Reach Level 10 |
| 🌟 Century Club | Earn 100 XP |
| 🚀 World Explorer | Complete quests in 3+ worlds |

---

## 📜 License

ISC

---

> Built with ❤️ for devs who dare to quest.
