/**
 * Authentication Service
 * Handles all API calls related to user authentication
 */
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Response from the API
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Login a user
 * @param {string} username - Username or email
 * @param {string} password - User password
 * @returns {Promise} - Response from the API
 */
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Logout the current user
 * @returns {Promise} - Response from the API
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post(`${API_URL}/logout`, {}, config);
    
    // Clear local storage regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return response.data;
  } catch (error) {
    // Still clear local storage even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error.response?.data || { message: 'Logout failed' };
  }
};

/**
 * Get the current user's profile
 * @returns {Promise} - Response from the API
 */
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(`${API_URL}/profile`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get profile' };
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get the current user from local storage
 * @returns {Object|null} - User object or null if not authenticated
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Setup axios interceptor for authentication
 */
export const setupAuthInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Auto logout if 401 response returned from api
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );
};
