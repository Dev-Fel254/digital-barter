// Mock Supabase client implementation with user database
// This is a temporary solution until you can install the actual @supabase/supabase-js package

// Get registered users from localStorage or initialize empty array
export const getRegisteredUsers = () => {
  try {
    const usersJson = localStorage.getItem('registeredUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error getting registered users:', error);
    return [];
  }
};

// Save registered users to localStorage
export const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving registered users:', error);
  }
};

// Mock Supabase client
const supabase = {
  auth: {
    signUp: async ({ email, password, options }) => {
      console.log('Mock signUp called with:', { email, password, options });
      
      // Get current registered users
      const users = getRegisteredUsers();
      
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        return {
          data: null,
          error: {
            message: 'User with this email already exists'
          }
        };
      }
      
      // Create new user
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        password, // In a real app, this would be hashed
        user_metadata: options?.data || {}
      };
      
      // Add to registered users
      users.push(newUser);
      saveRegisteredUsers(users);
      
      // Return successful registration
      return {
        data: {
          user: {
            id: newUser.id,
            email,
            user_metadata: newUser.user_metadata
          },
          session: null
        },
        error: null
      };
    },
    
    signInWithPassword: async ({ email, password }) => {
      console.log('Mock signInWithPassword called with:', { email, password });
      
      // Get registered users
      const users = getRegisteredUsers();
      
      // Find user with matching email and password
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return {
          data: null,
          error: {
            message: 'Invalid login credentials'
          }
        };
      }
      
      // Return successful login
      return {
        data: {
          user: {
            id: user.id,
            email: user.email,
            user_metadata: user.user_metadata || {
              full_name: user.email.split('@')[0],
              avatar_url: null
            }
          },
          session: {
            access_token: 'mock-token-' + Math.random().toString(36).substring(2)
          }
        },
        error: null
      };
    },
    
    signInWithOAuth: async ({ provider, options }) => {
      console.log('Mock signInWithOAuth called with:', { provider, options });
      // In a real implementation, this would redirect to the OAuth provider
      // For our mock, we'll simulate the redirect by setting data in localStorage
      
      // Create a fake URL that would be similar to what Supabase would use
      const redirectUrl = options?.redirectTo || window.location.origin;
      
      // Log the redirect that would happen in a real implementation
      console.log(`Would redirect to ${provider} auth page and then back to ${redirectUrl}`);
      
      // Instead of redirecting, we'll simulate a successful OAuth login
      // Store mock data in localStorage
      const mockUser = {
        id: 'mock-user-id',
        email: `${provider}.user@example.com`,
        user_metadata: {
          full_name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          avatar_url: null,
          provider: provider
        }
      };
      
      // Generate a mock token
      const mockToken = 'mock-token-' + Math.random().toString(36).substring(2);
      
      // Store the data that would normally come from the OAuth provider
      localStorage.setItem('mockOAuthUser', JSON.stringify(mockUser));
      localStorage.setItem('mockOAuthToken', mockToken);
      localStorage.setItem('mockOAuthProvider', provider);
      
      // Directly navigate to the callback URL
      window.location.href = '/auth/callback?provider=' + provider;
      
      return {
        data: { provider, url: `https://${provider}.com/oauth` },
        error: null
      };
    },
    
    signOut: async () => {
      console.log('Mock signOut called');
      // Simulate successful logout
      return { error: null };
    },
    
    getSession: async () => {
      console.log('Mock getSession called');
      // Check if we have a mock token in localStorage
      const token = localStorage.getItem('token');
      
      if (token && token.startsWith('mock-token-')) {
        // If we're in the callback page and have a mock OAuth provider, simulate that flow
        const provider = localStorage.getItem('mockOAuthProvider');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        return {
          data: {
            session: {
              access_token: token,
              user: {
                id: 'mock-user-id',
                email: user.email || 'user@example.com',
                user_metadata: {
                  full_name: user.name || 'Mock User',
                  avatar_url: null,
                  provider: provider
                }
              }
            }
          },
          error: null
        };
      }
      
      // No session
      return { data: { session: null }, error: null };
    },
    
    getUser: async () => {
      console.log('Mock getUser called');
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (user.email) {
        return {
          data: {
            user: {
              id: 'mock-user-id',
              email: user.email,
              user_metadata: {
                full_name: user.name,
                avatar_url: user.avatar
              }
            }
          },
          error: null
        };
      }
      
      // No user
      return { data: { user: null }, error: null };
    },
    
    onAuthStateChange: (callback) => {
      console.log('Mock onAuthStateChange called');
      // Call the callback once with a mock event
      callback('SIGNED_IN', { user: { id: 'mock-user-id' } });
      
      // Return a fake subscription that does nothing
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    }
  }
};

export default supabase;
