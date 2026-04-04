/* ===================================
   DevQuest — api.js
   API service layer — handles all backend calls
   =================================== */

const API = (() => {
  'use strict';

  const BASE_URL = '/api';

  function getToken()  { return localStorage.getItem('dq_token'); }
  function setToken(t) { localStorage.setItem('dq_token', t); }
  function clearToken(){ localStorage.removeItem('dq_token'); }
  function isLoggedIn(){ return !!getToken(); }

  async function request(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const res  = await fetch(BASE_URL + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }

  async function register(username, email, password) {
    const data = await request('POST', '/register', { username, email, password });
    setToken(data.token);
    return data.user;
  }

  async function login(email, password) {
    const data = await request('POST', '/login', { email, password });
    setToken(data.token);
    return data.user;
  }

  function logout() {
    clearToken();
    window.location.href = '/login.html';
  }

  async function getMe() {
    const data = await request('GET', '/me');
    return data.user;
  }

  async function getTasks() {
    const data = await request('GET', '/tasks');
    return data.data;
  }

  async function completeQuest(world, index) {
    const data = await request('PUT', `/complete/${world}/${index}`);
    return data;
  }

  async function resetProgress() {
    return request('DELETE', '/me/reset');
  }

  function requireAuth() {
    if (!isLoggedIn()) window.location.href = '/login.html';
  }

  return { register, login, logout, getMe, getTasks, completeQuest, resetProgress, requireAuth, isLoggedIn };
})();
