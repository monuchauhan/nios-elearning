// Authentication utilities

const AUTH_TOKEN_KEY = 'elearn_token';
const USER_KEY = 'elearn_user';

// Save authentication data
function saveAuth(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get stored token
function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Get stored user
function getUser() {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Check if user has purchased course
function hasPurchased() {
  const user = getUser();
  return user?.hasPurchased || false;
}

// Refresh user data from server
async function refreshUser() {
  if (!isLoggedIn()) return null;
  
  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      updateUser(data.user);
      return data.user;
    }
  } catch (error) {
    console.error('Failed to refresh user data:', error);
  }
  return null;
}

// Logout
function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = '/';
}

// Update user data
function updateUser(userData) {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    return false;
  }
  return true;
}

// Update navigation based on auth state
function updateNavigation() {
  const navUser = document.getElementById('nav-user');
  const navAuth = document.getElementById('nav-auth');
  
  if (isLoggedIn()) {
    const user = getUser();
    if (navUser) {
      navUser.classList.remove('hidden');
      const avatar = navUser.querySelector('.user-avatar');
      if (avatar && user) {
        avatar.textContent = user.name.charAt(0).toUpperCase();
      }
    }
    if (navAuth) {
      navAuth.classList.add('hidden');
    }
  } else {
    if (navUser) navUser.classList.add('hidden');
    if (navAuth) navAuth.classList.remove('hidden');
  }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
