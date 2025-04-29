// This file creates test users for the Digital Barter application
// It should be imported and run once when the application starts

import { getRegisteredUsers, saveRegisteredUsers } from './supabase';

/**
 * Initialize test users in the application
 * This ensures there's always at least one user to log in with
 */
export function initializeTestUsers() {
  // Get current registered users
  const users = getRegisteredUsers();
  
  // Only add test users if none exist
  if (users.length === 0) {
    console.log('Initializing test users for Digital Barter');
    
    // Create a test user
    const testUser = {
      id: 'user-test-1',
      email: 'test@example.com',
      password: 'password123',
      user_metadata: {
        full_name: 'Test User',
        avatar_url: null,
        location: 'Nairobi, Kenya',
        bio: 'I love bartering items!'
      }
    };
    
    // Add the test user to the registered users
    users.push(testUser);
    saveRegisteredUsers(users);
    
    console.log('Test user created with email: test@example.com and password: password123');
  }
}
