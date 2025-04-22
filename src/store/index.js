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
      profile: null,
      loading: false,
      error: null
    }
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
    
    // Simulate successful auth actions
    if (action === 'auth/login') {
      this.commit('auth/SET_TOKEN', 'dummy-token');
      return true;
    }
    
    if (action === 'auth/register') {
      return true;
    }
    
    if (action === 'auth/logout') {
      this.commit('auth/SET_TOKEN', null);
    }
    
    return false;
  }
};

export default store;