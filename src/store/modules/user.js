// Initial state
const state = {
  profile: null,
  loading: false,
  error: null
}

// Getters
const getters = {
  userProfile: state => state.profile,
  isProfileLoading: state => state.loading,
  profileError: state => state.error
}

// Mutations
const mutations = {
  SET_USER_PROFILE(state, profile) {
    state.profile = profile
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

// Actions
const actions = {
  async fetchUserProfile({ commit, rootState }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await fetch('http://localhost:3000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${rootState.auth.token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile')
      }

      commit('SET_USER_PROFILE', data)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateProfile({ commit, rootState }, profileData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${rootState.auth.token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      commit('SET_USER_PROFILE', data)
      return true
    } catch (error) {
      commit('SET_ERROR', error.message)
      return false
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}