// Temporary store implementation until Vuex can be installed
// This creates a simple reactive store that mimics basic Vuex functionality

const store = {
  state: {
    loading: false,
    error: null,
    auth: {
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      authError: null
    },
    user: {
      profile: JSON.parse(localStorage.getItem('userProfile')) || {
        name: 'Guest User',
        email: '',
        location: '',
        bio: '',
        avatar: null
      },
      loading: false,
      error: null
    }
  },
  
  // Getters to mimic Vuex functionality
  getters: {
    'user/userProfile': (state) => state.user.profile,
    'user/isProfileLoading': (state) => state.user.loading,
    'user/profileError': (state) => state.user.error,
    'auth/isAuthenticated': (state) => state.auth.isAuthenticated,
    'auth/authError': (state) => state.auth.authError
  },
  
  // Simple implementation to replace Vuex functionality temporarily
  commit(mutation, payload) {
    console.log(`Mutation: ${mutation}`, payload);
    
    // Handle auth mutations
    if (mutation === 'auth/SET_TOKEN') {
      this.state.auth.token = payload;
      this.state.auth.isAuthenticated = !!payload;
      
      if (payload) {
        localStorage.setItem('token', payload);
      } else {
        localStorage.removeItem('token');
      }
    }
    
    if (mutation === 'auth/SET_AUTH_ERROR') {
      this.state.auth.authError = payload;
    }
    
    // Handle user mutations
    if (mutation === 'user/SET_USER_PROFILE') {
      this.state.user.profile = payload;
      if (payload) {
        localStorage.setItem('userProfile', JSON.stringify(payload));
      }
    }
    
    if (mutation === 'user/SET_LOADING') {
      this.state.user.loading = payload;
    }
    
    if (mutation === 'user/SET_ERROR') {
      this.state.user.error = payload;
    }
    
    // Handle global mutations
    if (mutation === 'SET_LOADING') {
      this.state.loading = payload;
    }
    if (mutation === 'SET_ERROR') {
      this.state.error = payload;
    }
  },
  
  async dispatch(action, payload) {
    console.log(`Action: ${action}`, payload);
    
    // Auth actions
    if (action === 'auth/login') {
      this.commit('auth/SET_TOKEN', 'dummy-token');
      
      // Simulate fetching user profile after login
      const dummyProfile = {
        name: 'John Doe',
        email: 'john@example.com',
        location: 'Nairobi, Kenya',
        bio: 'Digital barter enthusiast',
        avatar: null
      };
      this.commit('user/SET_USER_PROFILE', dummyProfile);
      
      return true;
    }
    
    if (action === 'auth/register') {
      return true;
    }
    
    if (action === 'auth/logout') {
      // Clear all auth and user data
      this.commit('auth/SET_TOKEN', null);
      this.commit('user/SET_USER_PROFILE', null);
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userProfile');
      
      // Return success to allow chaining
      return true;
    }
    
    // User actions
    if (action === 'user/fetchUserProfile') {
      this.commit('user/SET_LOADING', true);
      
      try {
        // Simulate API call
        // In a real app, this would fetch from the backend
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          this.commit('user/SET_USER_PROFILE', JSON.parse(savedProfile));
        } else if (this.state.auth.isAuthenticated) {
          // If authenticated but no profile, create a dummy one
          const dummyProfile = {
            name: 'John Doe',
            email: 'john@example.com',
            location: 'Nairobi, Kenya',
            bio: 'Digital barter enthusiast',
            avatar: null
          };
          this.commit('user/SET_USER_PROFILE', dummyProfile);
        }
        this.commit('user/SET_ERROR', null);
        return true;
      } catch (error) {
        this.commit('user/SET_ERROR', error.message);
        return false;
      } finally {
        this.commit('user/SET_LOADING', false);
      }
    }
    
    if (action === 'user/updateProfile') {
      this.commit('user/SET_LOADING', true);
      
      try {
        // Simulate API call
        // In a real app, this would update the backend
        this.commit('user/SET_USER_PROFILE', {
          ...this.state.user.profile,
          ...payload
        });
        this.commit('user/SET_ERROR', null);
        return true;
      } catch (error) {
        this.commit('user/SET_ERROR', error.message);
        return false;
      } finally {
        this.commit('user/SET_LOADING', false);
      }
    }
    
    return false;
  }
};

export default store;