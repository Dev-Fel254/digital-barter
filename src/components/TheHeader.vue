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
              <div class="account-section">
                <router-link v-if="!isAuthenticated" to="/auth/login" class="icon-button">
                  <i class="fas fa-user"></i>
                </router-link>
                <div v-else class="user-profile" @click="toggleAccountMenu">
                  <div class="user-avatar">{{ userInitials }}</div>
                  <div class="account-dropdown" v-if="showAccountMenu">
                    <div class="dropdown-header">
                      Welcome, {{ userName }}!
                    </div>
                    <router-link to="/dashboard/profile" class="dropdown-item">
                      <i class="fas fa-user-circle"></i> My Profile
                    </router-link>
                    <router-link to="/categories" class="dropdown-item">
                      <i class="fas fa-box"></i> My Items
                    </router-link>
                    <router-link to="/dashboard/transactions" class="dropdown-item">
                      <i class="fas fa-exchange-alt"></i> My Trades
                    </router-link>
                    <div class="dropdown-divider"></div>
                    <button @click="logout" class="dropdown-item text-danger">
                      <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      showAccountMenu: false
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token')
    },
    userName() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.name || 'User'
    },
    userInitials() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user.name) return 'U'
      
      const nameParts = user.name.split(' ')
      if (nameParts.length > 1) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      }
      return nameParts[0][0].toUpperCase()
    }
  },
  methods: {
    toggleSearch() {
      // Implement search functionality
      console.log('Toggle search')
    },
    toggleAccountMenu() {
      this.showAccountMenu = !this.showAccountMenu
    },
    logout() {
      // Clear user data from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Close the account menu
      this.showAccountMenu = false
      
      // Redirect to home page
      this.$router.push('/')
    }
  },
  mounted() {
    // Close account menu when clicking outside
    document.addEventListener('click', (event) => {
      const accountSection = document.querySelector('.account-section')
      if (accountSection && !accountSection.contains(event.target)) {
        this.showAccountMenu = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar {
  padding: 0.75rem 0;
}

.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  
  .logo-text {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 1px;
    
    &:first-child {
      font-size: 0.9rem;
      letter-spacing: 2px;
    }
  }
}

.nav-link {
  padding: 0.5rem 1rem;
  color: var(--text-color);
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover, &.router-link-active {
    color: var(--primary-color);
  }
}

.icon-button {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    color: var(--primary-color);
  }
}

.account-section {
  position: relative;
}

.user-profile {
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.account-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 220px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
  margin-top: 0.5rem;
  
  .dropdown-header {
    padding: 1rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    font-weight: 600;
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.2s ease;
    
    i {
      width: 20px;
      text-align: center;
    }
    
    &:hover {
      background-color: rgba(var(--primary-color-rgb), 0.1);
    }
    
    &.text-danger {
      color: var(--error-color);
      
      &:hover {
        background-color: rgba(var(--error-color-rgb), 0.1);
      }
    }
  }
  
  .dropdown-divider {
    height: 1px;
    background-color: var(--border-color);
    margin: 0.25rem 0;
  }
}

// Responsive adjustments
@media (max-width: 992px) {
  .navbar-nav {
    padding: 1rem 0;
  }
  
  .nav-item {
    width: 100%;
    text-align: center;
    margin: 0.25rem 0;
  }
  
  .account-dropdown {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 12px 12px 0 0;
    margin-top: 0;
  }
}
</style>