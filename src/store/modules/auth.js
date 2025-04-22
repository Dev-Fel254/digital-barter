// Initial state
const state = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  authError: null
}

// Getters
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  authError: state => state.authError
}

// Mutations
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('token', token)
      state.isAuthenticated = true
    } else {
      localStorage.removeItem('token')
      state.isAuthenticated = false
    }
  },
  SET_AUTH_ERROR(state, error) {
    state.authError = error
  }
}

// Actions
const actions = {
  async login({ commit, dispatch }, credentials) {
    try {
      commit('SET_AUTH_ERROR', null)
      // Here you would make an API call to your backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      commit('SET_TOKEN', data.token)
      dispatch('user/fetchUserProfile', null, { root: true })
      return true
    } catch (error) {
      commit('SET_AUTH_ERROR', error.message)
      return false
    }
  },

  async register({ commit }, userData) {
    try {
      commit('SET_AUTH_ERROR', null)
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      return true
    } catch (error) {
      commit('SET_AUTH_ERROR', error.message)
      return false
    }
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
    commit('user/SET_USER_PROFILE', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}