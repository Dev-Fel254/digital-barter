<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <div class="logo">
            <span class="logo-text">DIGITAL</span>
            <span class="logo-text gradient-text">BARTER</span>
          </div>
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/wish" class="nav-link">WISH</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/swap" class="nav-link">SWAP</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/members" class="nav-link">ONLINE MEMBERS</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categories" class="nav-link">CATEGORY DISPLAY</router-link>
            </li>
            <!-- Search and Account Icons -->
            <li class="nav-item ms-2">
              <button class="icon-button" @click="toggleSearch">
                <i class="fas fa-search"></i>
              </button>
            </li>
            <li class="nav-item ms-2">
              <div class="account-dropdown">
                <button class="icon-button" @click="toggleAccountMenu">
                  <i class="fas fa-user"></i>
                </button>
                <!-- Account Dropdown Menu -->
                <div class="dropdown-menu" v-if="showAccountMenu && isAuthenticated">
                  <div class="dropdown-header">
                    Welcome {{ username }}
                  </div>
                  <router-link to="/profile" class="dropdown-item">My Account</router-link>
                  <button @click="logout" class="dropdown-item">Logout</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Login Modal -->
    <div class="modal-overlay" v-if="showLoginModal" @click="closeLoginModal">
      <div class="login-modal" @click.stop>
        <h2>Login Here</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-row">
            <div class="form-group">
              <label for="username">Username</label>
              <input 
                type="text" 
                id="username" 
                v-model="loginForm.username" 
                class="form-control" 
                required
              >
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="loginForm.password" 
                  class="form-control" 
                  required
                >
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="togglePasswordVisibility"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="loginForm.remember">
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-password" @click.prevent="forgotPassword">Forgot Password?</a>
          </div>
          <button type="submit" class="login-button" :disabled="isLoading">LOGIN</button>
          <div class="social-login">
            <p class="divider"><span>Or Sign Up Using</span></p>
            <div class="social-buttons">
              <button type="button" class="social-button google" @click="socialLogin('google')">
                <i class="fab fa-google"></i>
              </button>
              <button type="button" class="social-button twitter" @click="socialLogin('twitter')">
                <i class="fa-brands fa-x-twitter"></i>
              </button>
              <button type="button" class="social-button facebook" @click="socialLogin('facebook')">
                <i class="fab fa-facebook-f"></i>
              </button>
            </div>
          </div>
          <div class="register-link">
            New User? <a href="#" @click.prevent="openRegisterModal">Sign Up Here</a>
          </div>
          <div v-if="errors.general" class="text-danger">{{ errors.general }}</div>
        </form>
      </div>
    </div>

    <!-- Register Modal -->
    <div class="modal-overlay" v-if="showRegisterModal" @click="closeRegisterModal">
      <div class="register-modal" @click.stop>
        <h2>Create Account</h2>
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="registerForm.firstName" 
                class="form-control" 
                required
              >
              <div v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="registerForm.lastName" 
                class="form-control" 
                required
              >
              <div v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="registerForm.email" 
                class="form-control" 
                required
              >
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="registerForm.phone" 
                class="form-control" 
                required
              >
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="regPassword">Password</label>
              <div class="password-input">
                <input 
                  :type="showRegPassword ? 'text' : 'password'" 
                  id="regPassword" 
                  v-model="registerForm.password" 
                  class="form-control" 
                  required
                >
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="toggleRegPasswordVisibility"
                >
                  <i :class="showRegPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="password-input">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  id="confirmPassword" 
                  v-model="registerForm.confirmPassword" 
                  class="form-control" 
                  required
                >
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="toggleConfirmPasswordVisibility"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>
          </div>

          <button type="submit" class="register-button" :disabled="isLoading">REGISTER</button>
          
          <div class="social-login">
            <p class="divider"><span>Or Sign Up Using</span></p>
            <div class="social-buttons">
              <button type="button" class="social-button google" @click="socialLogin('google')">
                <i class="fab fa-google"></i>
              </button>
              <button type="button" class="social-button twitter" @click="socialLogin('twitter')">
                <i class="fa-brands fa-x-twitter"></i>
              </button>
              <button type="button" class="social-button facebook" @click="socialLogin('facebook')">
                <i class="fab fa-facebook-f"></i>
              </button>
            </div>
          </div>

          <div class="login-link">
            Already have an account? <a href="#" @click.prevent="openLoginModal">Login Here</a>
          </div>
          <div v-if="errors.general" class="text-danger">{{ errors.general }}</div>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      showAccountMenu: false,
      showLoginModal: false,
      showRegisterModal: false,
      showPassword: false,
      showRegPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      errors: {},
      isAuthenticated: false,
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    toggleAccountMenu() {
      if (!this.isAuthenticated) {
        this.openLoginModal();
      } else {
        this.showAccountMenu = !this.showAccountMenu;
      }
    },
    validateLoginForm() {
      this.errors = {};
      if (!this.loginForm.username.trim()) {
        this.errors.username = 'Username is required';
      }
      if (!this.loginForm.password) {
        this.errors.password = 'Password is required';
      }
      return Object.keys(this.errors).length === 0;
    },

    validateRegisterForm() {
      this.errors = {};
      if (!this.registerForm.firstName.trim()) {
        this.errors.firstName = 'First name is required';
      }
      if (!this.registerForm.lastName.trim()) {
        this.errors.lastName = 'Last name is required';
      }
      if (!this.registerForm.email.trim()) {
        this.errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerForm.email)) {
        this.errors.email = 'Please enter a valid email';
      }
      if (!this.registerForm.phone.trim()) {
        this.errors.phone = 'Phone number is required';
      }
      if (!this.registerForm.password) {
        this.errors.password = 'Password is required';
      } else if (this.registerForm.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters';
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match';
      }
      return Object.keys(this.errors).length === 0;
    },

    async handleLogin() {
      if (!this.validateLoginForm()) return;
      
      try {
        this.isLoading = true;
        // TODO: Replace with your actual API endpoint
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        // Store token in localStorage or Vuex store
        localStorage.setItem('token', data.token);
        
        // Close modal and redirect
        this.closeLoginModal();
        this.$router.push('/dashboard');
      } catch (error) {
        this.errors.general = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async handleRegister() {
      if (!this.validateRegisterForm()) return;

      try {
        this.isLoading = true;
        // TODO: Replace with your actual API endpoint
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.registerForm)
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Registration failed');
        }

        // Show success message and switch to login
        this.$toast.success('Registration successful! Please login.');
        this.switchToLogin();
      } catch (error) {
        this.errors.general = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async socialLogin(provider) {
      try {
        this.isLoading = true;
        // TODO: Implement social login logic
        switch (provider) {
          case 'google':
            // Initialize Google OAuth
            break;
          case 'twitter':
            // Initialize Twitter OAuth
            break;
          case 'facebook':
            // Initialize Facebook OAuth
            break;
        }
      } catch (error) {
        this.errors.general = 'Social login failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    toggleRegPasswordVisibility() {
      this.showRegPassword = !this.showRegPassword;
    },

    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    openLoginModal() {
      this.showLoginModal = true;
      this.showRegisterModal = false;
      this.resetForms();
    },

    openRegisterModal() {
      this.showRegisterModal = true;
      this.showLoginModal = false;
      this.resetForms();
    },

    closeLoginModal() {
      this.showLoginModal = false;
      this.resetForms();
    },

    closeRegisterModal() {
      this.showRegisterModal = false;
      this.resetForms();
    },

    switchToLogin() {
      this.showLoginModal = true;
      this.showRegisterModal = false;
      this.resetForms();
    },

    switchToRegister() {
      this.showRegisterModal = true;
      this.showLoginModal = false;
      this.resetForms();
    },

    resetForms() {
      this.loginForm = {
        username: '',
        password: '',
        remember: false
      };
      this.registerForm = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      };
      this.errors = {};
      this.showPassword = false;
      this.showRegPassword = false;
      this.showConfirmPassword = false;
    },

    forgotPassword() {
      // TODO: Implement forgot password functionality
      console.log('Forgot password clicked');
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .navbar-brand {
    text-decoration: none;
  }

  .logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
    
    .logo-text {
      font-weight: bold;
      font-size: 1.5rem;
      color: #333;
      
      &.gradient-text {
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .nav-link {
    color: var(--text-color);
    font-weight: 500;
    padding: 0.5rem 1rem;
    
    &:hover, &.router-link-active {
      color: var(--primary-color);
    }
  }

  .icon-button {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--text-color);
    font-size: 1.2rem;
    
    &:hover {
      color: var(--primary-color);
    }
  }

  .account-dropdown {
    position: relative;

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      min-width: 200px;
      z-index: 1000;

      .dropdown-header {
        padding: 1rem;
        border-bottom: 1px solid #eee;
        font-weight: 500;
      }

      .dropdown-item {
        display: block;
        padding: 0.75rem 1rem;
        color: var(--text-color);
        text-decoration: none;
        
        &:hover {
          background: #f8f9fa;
          color: var(--primary-color);
        }
      }
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
}

.login-modal {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  margin: 0 auto;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}

.register-modal {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  margin: 0 auto;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}

@media (max-width: 576px) {
  .login-modal, .register-modal {
    width: 95%;
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }
}

.login-modal, .register-modal {
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--text-color);
    font-size: 1.5rem;
    font-weight: 500;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.75rem;
      color: var(--text-color);
      font-weight: 500;
    }

    .password-input {
      position: relative;

      .toggle-password {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 0.25rem;
      }
    }
  }

  .form-control {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      color: var(--text-color);
    }

    .forgot-password {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.9rem;
    }
  }

  .login-button, .register-button {
    width: 100%;
    padding: 0.875rem;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;
    margin: 1.5rem 0;
    letter-spacing: 0.5px;
  }

  .social-login {
    text-align: center;
    margin-top: 1.5rem;

    .divider {
      text-align: center;
      color: var(--text-light);
      font-size: 0.9rem;
      margin: 1.5rem 0;
    }

    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;

      .social-button {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: white;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }

        &.google {
          background: #DB4437;
        }

        &.twitter {
          background: #000000;
          i {
            font-size: 1rem;
          }
        }

        &.facebook {
          background: #4267B2;
        }
      }
    }
  }

  .register-link, .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: var(--text-color);
    
    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      margin-left: 0.25rem;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>