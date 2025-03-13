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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const loading = ref(false)
    const error = ref(null)

    const handleLogin = async () => {
      loading.value = true
      error.value = null

      try {
        const success = await store.dispatch('auth/login', {
          email: email.value,
          password: password.value
        })

        if (success) {
          router.push('/dashboard')
        }
      } catch (err) {
        error.value = err.message || 'Failed to login'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      showPassword,
      loading,
      error,
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
  }
}

.login-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
    }
  }

  .password-input {
    position: relative;

    .toggle-password {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      cursor: pointer;

      &:hover {
        color: #FFD700;
      }
    }
  }

  .btn-primary {
    background: #FFD700;
    border: none;
    padding: 0.75rem;
    font-weight: 600;
    width: 100%;
    margin-top: 1rem;

    &:hover {
      background: darken(#FFD700, 10%);
    }

    &:disabled {
      background: #ddd;
    }
  }
}

.form-footer {
  margin-top: 2rem;
  text-align: center;
  
  a {
    color: #FFD700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    margin-top: 1rem;
    color: #666;
  }
}
</style>