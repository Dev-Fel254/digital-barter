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

      try {
        // Simulate successful login for now
        // This will be replaced with actual Vuex store dispatch when dependencies are installed
        console.log('Login attempted with:', this.email, this.password)
        
        // Get the last registered user if it exists
        const lastRegisteredUser = JSON.parse(localStorage.getItem('lastRegisteredUser') || '{}')
        
        // Use the username from the last registered user if available
        // or use the email username part as a fallback
        let userName = lastRegisteredUser.username || this.email.split('@')[0]
        
        // Capitalize the first letter of the username
        userName = userName.charAt(0).toUpperCase() + userName.slice(1)
        
        // Simulate a successful login
        const userData = {
          name: userName,
          email: this.email,
          registrationDate: new Date().toLocaleDateString()
        }
        
        // Store user data in localStorage
        localStorage.setItem('token', 'dummy-token')
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Create a success message
        this.success = 'Login successful! Redirecting...'
        
        // Trigger an event to notify components that user auth has changed
        // This must happen AFTER localStorage is updated
        window.dispatchEvent(new Event('user-auth-change'))
        
        // Redirect to categories page after a short delay
        setTimeout(() => {
          this.$router.push('/categories')
        }, 1000)
      } catch (err) {
        this.error = err.message || 'Failed to login'
      } finally {
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
    text-align: center;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
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