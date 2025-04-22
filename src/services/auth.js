import supabase from './supabase'

/**
 * Authentication service for handling Supabase auth operations
 */
export default {
  /**
   * Sign up a new user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {object} userData - Additional user data
   * @returns {Promise} - Auth response
   */
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    return data
  },
  
  /**
   * Sign in with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} - Auth response
   */
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },
  
  /**
   * Sign in with Google OAuth
   * @returns {Promise} - Auth response
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    })
    
    if (error) throw error
    return data
  },
  
  /**
   * Sign in with Facebook OAuth
   * @returns {Promise} - Auth response
   */
  async signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    })
    
    if (error) throw error
    return data
  },
  
  /**
   * Sign in with Twitter/X OAuth
   * @returns {Promise} - Auth response
   */
  async signInWithTwitter() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    })
    
    if (error) throw error
    return data
  },
  
  /**
   * Sign out the current user
   * @returns {Promise} - Auth response
   */
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  },
  
  /**
   * Get the current user session
   * @returns {Promise} - Session data
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data
  },
  
  /**
   * Get the current user
   * @returns {Promise} - User data
   */
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },
  
  /**
   * Set up auth state change listener
   * @param {Function} callback - Function to call when auth state changes
   * @returns {Function} - Unsubscribe function
   */
  onAuthStateChange(callback) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
    
    return data.subscription.unsubscribe
  }
}
