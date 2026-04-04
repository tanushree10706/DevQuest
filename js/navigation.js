/* ===================================
   DevQuest — navigation.js
   Sidebar toggle, active nav, topbar updates
   =================================== */

(function () {
  'use strict';

  function initSidebarToggle() {
    const toggle  = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.toggle('active', href === path);
    });
  }

  function updateTopbar() {
    if (typeof XPSystem === 'undefined') return;
    const state = XPSystem.getState();

    const topbarXp = document.getElementById('topbar-xp');
    const streakEl = document.getElementById('streak-count');
    const sbUser   = document.getElementById('sb-username');
    const sbLevel  = document.getElementById('sb-level');

    if (topbarXp) topbarXp.textContent = state.xp;
    if (streakEl) streakEl.textContent = state.streak;
    if (sbUser)   sbUser.textContent   = state.username;
    if (sbLevel)  sbLevel.textContent  = state.level;

    document.querySelectorAll('.user-avatar').forEach(el => {
      el.textContent = (state.username || 'H')[0].toUpperCase();
    });
  }

  function initPageLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript')) {
        link.addEventListener('click', () => {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('open');
        });
      }
    });
  }

  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function initWorldTabs() {
    const tabs = document.querySelectorAll('.world-tab');
    if (!tabs.length) return;

    const paramWorld = getParam('world');
    if (paramWorld) {
      tabs.forEach(t => t.classList.toggle('active', t.dataset.world === paramWorld));
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (typeof renderQuestWorld === 'function') {
          renderQuestWorld(tab.dataset.world);
        }
      });
    });
  }

  // Logout button handler
  function initLogout() {
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof API !== 'undefined') API.logout();
        else {
          localStorage.removeItem('dq_token');
          window.location.href = '/login.html';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    setActiveNav();
    updateTopbar();
    initPageLinks();
    initWorldTabs();
    initLogout();
  });

  window.NavUtils = { updateTopbar, getParam };
})();
