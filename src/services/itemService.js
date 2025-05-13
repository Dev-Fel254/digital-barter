/**
 * Item Service
 * Handles all API calls related to items
 */
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/items';

/**
 * Get all items
 * @returns {Promise} - Response from the API
 */
export const getAllItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch items' };
  }
};

/**
 * Get recent items with pagination
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {Promise} - Response from the API with items and pagination info
 */
export const getRecentItems = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/recent?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch recent items' };
  }
};

/**
 * Get a single item by ID
 * @param {string} id - Item ID
 * @returns {Promise} - Response from the API
 */
export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch item' };
  }
};

/**
 * Get items belonging to the current user
 * @returns {Promise} - Response from the API
 */
export const getUserItems = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(`${API_URL}/myitems`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch your items' };
  }
};

/**
 * Create a new item
 * @param {Object} itemData - Item data
 * @returns {Promise} - Response from the API
 */
export const createItem = async (itemData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post(API_URL, itemData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create item' };
  }
};

/**
 * Update an existing item
 * @param {string} id - Item ID
 * @param {Object} itemData - Updated item data
 * @returns {Promise} - Response from the API
 */
export const updateItem = async (id, itemData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.put(`${API_URL}/${id}`, itemData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update item' };
  }
};

/**
 * Delete an item
 * @param {string} id - Item ID
 * @returns {Promise} - Response from the API
 */
export const deleteItem = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete item' };
  }
};
