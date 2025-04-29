<template>
  <div class="login-view">
    <div class="login-container">
      <h1>Welcome Back</h1>
      <p class="subtitle">Login to access your Digital Barter account</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email"
            v-model="email"
            required
            class="form-control"
            placeholder="Enter your email"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input 
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              class="form-control"
              placeholder="Enter your password"
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
          <div v-if="error.includes('Invalid login')" class="mt-2">
            <small>Don't have an account? <router-link to="/auth/register">Register now</router-link></small>
          </div>
        </div>
        
        <div v-if="success" class="alert alert-success">
          {{ success }}
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          <span v-if="loading">
            <i class="fas fa-spinner fa-spin"></i> Logging in...
          </span>
          <span v-else>Login</span>
        </button>
        
        <div class="social-login">
          <div class="divider">
            <span>OR CONTINUE WITH</span>
          </div>
          <div class="social-buttons">
            <button type="button" class="social-btn facebook disabled" title="Coming soon">
              <i class="fab fa-facebook-f"></i>
            </button>
            <button type="button" class="social-btn google disabled" title="Coming soon">
              <i class="fab fa-google"></i>
            </button>
            <button type="button" class="social-btn twitter disabled" title="Coming soon">
              <i class="fab fa-x-twitter"></i>
            </button>
          </div>
        </div>
        
        <div class="form-footer">
          <router-link to="/auth/forgot-password">Forgot Password?</router-link>
          <p>
            Don't have an account? 
            <router-link to="/auth/register">Sign up</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authService from '@/services/auth'
import { signInWithGoogle } from '@/services/googleAuth'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      error: null,
      success: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null
      this.success = null

      try {
        // Sign in with email and password using Supabase
        const { data, error } = await authService.signIn(this.email, this.password)
        
        // Check for login errors
        if (error) {
          throw new Error(error.message)
        }
        
        if (!data || !data.user) {
          throw new Error('Invalid login credentials')
        }
        
        // Get user data from Supabase response
        const user = data.user
        
        // Create user profile data
        const userProfile = {
          name: user.user_metadata.full_name || user.email.split('@')[0],
          email: user.email,
          avatar: user.user_metadata.avatar_url,
          location: user.user_metadata.location || '',
          bio: user.user_metadata.bio || '',
          registrationDate: new Date().toLocaleDateString()
        }
        
        // Store user data in localStorage for the app to use
        localStorage.setItem('token', data.session.access_token)
        localStorage.setItem('userProfile', JSON.stringify(userProfile))
        
        // Update store with user data
        this.$store.commit('auth/SET_TOKEN', data.session.access_token)
        this.$store.commit('user/SET_USER_PROFILE', userProfile)
        
        // Create a success message
        this.success = 'Login successful! Redirecting...'
        
        // Trigger an event to notify components that user auth has changed
        window.dispatchEvent(new Event('user-auth-change'))
        
        // Show success message briefly, then reload and redirect
        setTimeout(() => {
          // Redirect to dashboard with a full page reload
          window.location.href = '/dashboard'
        }, 1000)
      } catch (err) {
        this.error = err.message || 'Failed to login'
        console.error('Login error:', err)
      } finally {
        this.loading = false
      }
    },
    
    async socialLogin(provider) {
      this.loading = true
      this.error = null
      
      try {
        switch(provider) {
          case 'google':
            // Use our custom Google authentication implementation
            signInWithGoogle();
            break;
          case 'facebook':
            await authService.signInWithFacebook()
            break
          case 'twitter':
            await authService.signInWithTwitter()
            break
          default:
            throw new Error('Unsupported provider')
        }
        
        // Note: The redirect and session handling will be managed by the AuthCallback component
        // after the OAuth flow completes
      } catch (err) {
        this.error = err.message || `Failed to login with ${provider}`
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
  background-color: var(--background-light);
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .subtitle {
    text-align: center;
    color: var(--text-light);
    margin-bottom: 2rem;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 500;
      color: var(--text-color);
    }
  }
  
  .password-input {
    position: relative;
    
    .toggle-password {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-light);
      cursor: pointer;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  
  .btn-block {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(var(--primary-color-rgb), 0.3);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  }
  
  .social-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    
    .divider {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid var(--border-color);
      line-height: 0.1em;
      margin-bottom: 1.5rem;
      
      span {
        background: white;
        padding: 0 10px;
        color: var(--text-light);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
    
    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      
      .social-btn {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        color: white;
        font-size: 1.2rem;
        
        &.disabled {
          opacity: 0.6;
          cursor: not-allowed;
          
          &:hover {
            transform: none;
            box-shadow: none;
          }
        }
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        &.facebook {
          background: linear-gradient(45deg, #3b5998, #8b9dc3);
          border: 2px solid rgba(255, 215, 0, 0.3);
          
          &:hover {
            background: linear-gradient(45deg, #4c70ba, #9eafd3);
          }
        }
        
        &.google {
          background: linear-gradient(45deg, #db4437, #f4b400);
          border: 2px solid rgba(255, 215, 0, 0.3);
          
          &:hover {
            background: linear-gradient(45deg, #e74c3c, #f5c542);
          }
        }
        
        &.twitter {
          background: linear-gradient(45deg, #1da1f2, #14171A);
          border: 2px solid rgba(255, 215, 0, 0.3);
          
          &:hover {
            background: linear-gradient(45deg, #1a91da, #2c3e50);
          }
        }
      }
    }
  }
  
  .form-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    
    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }
  
  .alert-danger {
    background-color: rgba(var(--error-color), 0.1);
    color: var(--error-color);
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .alert-success {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .login-container {
    padding: 1.5rem;
  }
}
</style>