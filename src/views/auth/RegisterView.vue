<template>
  <div class="register-container">
    <h1 class="title gradient-text">Create Account</h1>
    <p class="subtitle">Join our community and start bartering today!</p>
    
    <form @submit.prevent="register" class="register-form">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            v-model="form.firstName" 
            class="form-control" 
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            v-model="form.lastName" 
            class="form-control" 
            required
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          v-model="form.username" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="phone">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="form.phone" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="location">Location</label>
        <input 
          type="text" 
          id="location" 
          v-model="form.location" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password" 
          class="form-control" 
          required
        />
        <small class="password-hint">
          Password must be at least 8 characters and include uppercase, lowercase, number and special character
        </small>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="form.confirmPassword" 
          class="form-control" 
          required
        />
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading">Creating Account...</span>
        <span v-else>Create Account</span>
      </button>
      
      <p class="login-link">
        Already have an account? <router-link to="/auth/login">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async register() {
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }
      
      this.loading = true
      this.error = null
      
      try {
        // Remove confirmPassword as it's not needed in the API call
        const userData = { ...this.form }
        delete userData.confirmPassword
        
        // Use our temporary store implementation
        console.log('Registration attempted with:', userData)
        
        // Simulate successful registration
        this.$router.push('/auth/login')
      } catch (error) {
        this.error = error.message || 'Registration failed. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
  }
}

.password-hint {
  font-size: 0.8rem;
  color: var(--text-light);
}

.error-message {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
