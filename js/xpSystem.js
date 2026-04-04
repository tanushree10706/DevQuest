/* ===================================
   DevQuest — xpSystem.js  (v2 — 7 worlds)
   =================================== */
const XPSystem = (() => {
  const XP_PER_QUEST = 10;
  const XP_PER_LEVEL = 100;
  const ALL_WORLDS   = ['html','css','js','os','algo','ct','stats'];

  function emptyQuests() {
    const q = {};
    ALL_WORLDS.forEach(w => { q[w] = new Array(10).fill(false); });
    return q;
  }

  let _state = { xp:0, level:1, streak:0, username:'Hero', quests: emptyQuests(), activity:[] };

  function seedFromUser(user) {
    if (!user) return;
    _state.xp       = user.xp       || 0;
    _state.level    = user.level     || 1;
    _state.streak   = user.streak    || 0;
    _state.username = user.username  || 'Hero';
    _state.activity = user.activity  || [];
    // Merge received quests — fill missing worlds with defaults
    _state.quests = emptyQuests();
    if (user.quests) {
      ALL_WORLDS.forEach(w => {
        if (user.quests[w]) _state.quests[w] = user.quests[w];
      });
    }
    persist();
  }

  function persist() {
    try { localStorage.setItem('dq_cache', JSON.stringify(_state)); } catch(e) {}
  }

  function loadCache() {
    try {
      const c = localStorage.getItem('dq_cache');
      if (c) seedFromUser(JSON.parse(c));
    } catch(e) {}
  }

  function initState() { loadCache(); }

  function calcLevel(xp)  { return Math.floor(xp / XP_PER_LEVEL) + 1; }
  function xpInLevel(xp)  { return xp % XP_PER_LEVEL; }
  function xpPercent(xp)  { return (xpInLevel(xp) / XP_PER_LEVEL) * 100; }

  function worldStats(world) {
    const arr   = _state.quests[world] || new Array(10).fill(false);
    const done  = arr.filter(Boolean).length;
    const total = arr.length || 10;
    return { done, total, pct: Math.round((done/total)*100), xpEarned: done * XP_PER_QUEST };
  }

  function totalQuestsDone() {
    return ALL_WORLDS.reduce((sum, w) => sum + (_state.quests[w]||[]).filter(Boolean).length, 0);
  }

  function worldsActive() {
    return ALL_WORLDS.filter(w => (_state.quests[w]||[]).some(Boolean)).length;
  }

  function profileTitle(level) {
    if (level >= 15) return 'Grand Wizard 🔮';
    if (level >= 10) return 'Web Wizard 🧙';
    if (level >= 7)  return 'Code Knight ⚔️';
    if (level >= 5)  return 'Dev Explorer 🗺️';
    if (level >= 3)  return 'Code Squire 🛡️';
    return 'Code Apprentice 📜';
  }

  function applyQuestResult(world, index, result) {
    if (!_state.quests[world]) _state.quests[world] = new Array(10).fill(false);
    _state.quests[world][index] = result.toggled;
    _state.xp    = result.xp;
    _state.level = result.level;
    if (result.toggled && result.activity) {
      _state.activity.unshift(result.activity);
      if (_state.activity.length > 20) _state.activity.pop();
    }
    persist();
  }

  async function completeQuest(world, index, onLevelUp) {
    const result = await API.completeQuest(world, index);
    const prevLevel = _state.level;
    applyQuestResult(world, index, result);
    if (result.toggled && result.level > prevLevel && typeof onLevelUp === 'function') {
      onLevelUp(result.level);
    }
    return result;
  }

  async function reset() {
    try { await API.resetProgress(); } catch(e) {}
    localStorage.removeItem('dq_cache');
    _state = { xp:0, level:1, streak:0, username:_state.username, quests:emptyQuests(), activity:[] };
  }

  function getState() {
    const xp = _state.xp;
    return {
      xp, level:_state.level, streak:_state.streak, username:_state.username,
      quests:_state.quests, activity:_state.activity,
      xpInLevel: xpInLevel(xp), xpPercent: xpPercent(xp), xpToNext: XP_PER_LEVEL - xpInLevel(xp),
    };
  }

  return {
    initState, seedFromUser, getState, completeQuest, reset,
    calcLevel, xpPercent, xpInLevel, worldStats, totalQuestsDone, worldsActive, profileTitle,
    XP_PER_QUEST, XP_PER_LEVEL, ALL_WORLDS,
  };
})();
