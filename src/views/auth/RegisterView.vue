<template>
  <div class="register-container">
    <h1 class="title gradient-text">Registration Form</h1>
    <p class="subtitle"><span class="required-indicator">*</span>Indicates mandatory fields</p>
    
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="username">Username <span class="required-indicator">*</span></label>
        <input 
          type="text" 
          id="username" 
          v-model="form.username" 
          class="form-control" 
          required
          @input="validateUsername"
        />
        <small v-if="errors.username" class="error-text">{{ errors.username }}</small>
      </div>
      
      <div class="form-group">
        <label for="password">Password <span class="required-indicator">*</span></label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password <span class="required-indicator">*</span></label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="form.confirmPassword" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email <span class="required-indicator">*</span></label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          class="form-control" 
          required
        />
      </div>
      
      <div class="form-group">
        <div class="checkbox-container">
          <input 
            type="checkbox" 
            id="newsletter" 
            v-model="form.newsletter"
          />
          <label for="newsletter">Subscribe to Newsletters</label>
        </div>
      </div>
      
      <div class="form-group">
        <label for="securityCode">Security Code <span class="required-indicator">*</span></label>
        <div class="security-code-container">
          <div class="security-code-display">
            {{ securityCode }}
          </div>
          <input 
            type="text" 
            id="securityCode" 
            v-model="form.enteredCode" 
            class="form-control" 
            required
          />
        </div>
        <small v-if="errors.securityCode" class="error-text">{{ errors.securityCode }}</small>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-if="success" class="success-message">
        {{ success }}
      </div>
      
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading">Creating Account...</span>
        <span v-else>REGISTER</span>
      </button>
      
      <p class="login-link">
        Already have an account? <router-link to="/auth/login">Sign in</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import authService from '@/services/auth'

export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        newsletter: false,
        enteredCode: ''
      },
      securityCode: this.generateSecurityCode(),
      loading: false,
      error: null,
      success: null,
      errors: {
        username: null,
        securityCode: null
      }
    }
  },
  methods: {
    generateSecurityCode() {
      // Generate a random 4-digit code
      return Math.floor(1000 + Math.random() * 9000).toString();
    },
    validateUsername() {
      const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (specialCharsRegex.test(this.form.username)) {
        this.errors.username = 'Username should not contain special characters';
      } else {
        this.errors.username = null;
      }
    },
    async register() {
      // Reset errors and success
      this.error = null;
      this.success = null;
      this.errors.securityCode = null;
      
      // Validate username
      this.validateUsername();
      
      // Validate security code
      if (this.form.enteredCode !== this.securityCode) {
        this.errors.securityCode = 'Invalid security code';
        return;
      }
      
      // Validate password match
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }
      
      // Check if there are any validation errors
      if (this.errors.username) {
        return;
      }
      
      this.loading = true;
      
      try {
        // Prepare user data for Supabase
        const userData = {
          full_name: this.form.username,
          username: this.form.username,
          newsletter_subscription: this.form.newsletter
        };
        
        // Register user with Supabase
        const { error } = await authService.signUp(this.form.email, this.form.password, userData);
        
        // Check for registration errors
        if (error) {
          throw new Error(error.message);
        }
        
        // Store user data in localStorage for later use in login
        localStorage.setItem('lastRegisteredUser', JSON.stringify({
          username: this.form.username,
          email: this.form.email
        }));
        
        // Show success message
        this.success = 'Account created successfully! You can now log in with your credentials. Redirecting to login...';
        
        // Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 3000);
      } catch (error) {
        this.error = error.message || 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      } finally {
        this.loading = false;
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

.required-indicator {
  color: #FF6B6B;
  font-weight: bold;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
  }
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input[type="checkbox"] {
    width: auto;
  }
}

.security-code-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.security-code-display {
  background-color: #f8f8f8;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.2rem;
  letter-spacing: 3px;
  color: #333;
  border: 1px solid #ddd;
  min-width: 100px;
  text-align: center;
}

.error-text {
  color: #FF6B6B;
  font-size: 0.8rem;
}

.error-message {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.success-message {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #FFD700;
  color: #333;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: darken(#FFD700, 10%);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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
