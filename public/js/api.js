// API client utilities

const API_BASE = '/api';

// Make API request
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
}

// Auth API
const authAPI = {
  async login(email, password) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  
  async signup(name, email, mobile, password) {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, mobile, password })
    });
  },
  
  async getMe() {
    return apiRequest('/auth/me');
  }
};

// Course API
const courseAPI = {
  async getCourse() {
    return apiRequest('/course');
  },
  
  async getChapters() {
    return apiRequest('/chapters');
  },
  
  async getChapter(id) {
    return apiRequest(`/chapters/${id}`);
  },
  
  async getQuiz(chapterId) {
    return apiRequest(`/chapters/${chapterId}/quiz`);
  },
  
  async submitQuiz(chapterId, answers) {
    return apiRequest(`/chapters/${chapterId}/quiz/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }
};

// Payment API
const paymentAPI = {
  async validateCoupon(code) {
    return apiRequest('/payment/validate-coupon', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
  },
  
  async createPaymentIntent(couponCode) {
    return apiRequest('/payment/create-intent', {
      method: 'POST',
      body: JSON.stringify({ couponCode })
    });
  },
  
  async confirmPayment(paymentId) {
    return apiRequest('/payment/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentId })
    });
  }
};

// Show loading state
function showLoading(container) {
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
    </div>
  `;
}

// Show error message
function showError(container, message) {
  container.innerHTML = `
    <div class="alert alert-error">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      ${message}
    </div>
  `;
}

// Format currency
function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
}
