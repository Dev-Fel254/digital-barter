<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand">
          <div class="logo">
            <span class="logo-text">DIGITAL</span>
            <span class="logo-text gradient-text">BARTER</span>
          </div>
        </router-link>
        
        <!-- Mobile Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Mobile Actions -->
        <div class="mobile-actions">
          <button class="icon-button search-button" @click="toggleSearch">
            <i class="fas fa-search"></i>
          </button>
          
          <div class="mobile-profile">
            <router-link v-if="!isAuthenticated" to="/auth/login" class="icon-button">
              <i class="fas fa-user"></i>
            </router-link>
            <div v-else class="user-profile" @click="toggleAccountMenu">
              <div class="user-avatar">{{ userInitials }}</div>
            </div>
          </div>
        </div>
        
        <!-- Main Navigation -->
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
            
            <!-- Desktop Actions -->
            <div class="desktop-actions">
              <li class="nav-item ms-2">
                <button class="icon-button" @click="toggleSearch">
                  <i class="fas fa-search"></i>
                </button>
              </li>
              <li class="nav-item ms-2">
                <div class="desktop-profile">
                  <router-link v-if="!isAuthenticated" to="/auth/login" class="icon-button">
                    <i class="fas fa-user"></i>
                  </router-link>
                  <div v-else class="user-profile" @click="toggleAccountMenu">
                    <div class="user-avatar">{{ userInitials }}</div>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    
    <!-- Desktop Profile Dropdown -->
    <div class="desktop-dropdown" v-if="showAccountMenu && !isMobile">
      <div class="dropdown-header">
        Welcome, {{ isAuthenticated ? userName : 'Guest' }}!
      </div>
      <router-link to="/dashboard/profile" class="dropdown-item" @click="closeAccountMenu">
        <i class="fas fa-user-circle"></i> My Profile
      </router-link>
      <router-link to="/dashboard/items" class="dropdown-item" @click="closeAccountMenu">
        <i class="fas fa-box"></i> My Items
      </router-link>
      <router-link to="/dashboard/transactions" class="dropdown-item" @click="closeAccountMenu">
        <i class="fas fa-exchange-alt"></i> My Trades
      </router-link>
      <div class="dropdown-divider"></div>
      <button @click="logout" class="dropdown-item text-danger">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
    
    <!-- Mobile Profile Dropdown -->
    <div class="mobile-dropdown" v-if="showAccountMenu && isMobile">
      <div class="dropdown-header">
        Welcome, {{ isAuthenticated ? userName : 'Guest' }}!
      </div>
      <router-link to="/dashboard/profile" class="dropdown-item" @click="closeAccountMenu">
        <i class="fas fa-user-circle"></i> My Profile
      </router-link>
      <router-link to="/dashboard/items" class="dropdown-item" @click="closeAccountMenu">
        <i class="fas fa-box"></i> My Items
      </router-link>
      <router-link to="/dashboard/transactions" class="dropdown-item" @click="closeAccountMenu">
        <i class="fas fa-exchange-alt"></i> My Trades
      </router-link>
      <div class="dropdown-divider"></div>
      <button @click="logout" class="dropdown-item text-danger">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
    
    <!-- Dropdown Overlay -->
    <div class="dropdown-overlay" v-if="showAccountMenu" @click="closeAccountMenu"></div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      showAccountMenu: false,
      isMobile: false,
      isSearchOpen: false
    }
  },
  computed: {
    isAuthenticated() {
      // Simple check for token existence
      return !!localStorage.getItem('token');
    },
    userName() {
      if (!this.isAuthenticated) {
        return 'Guest';
      }
      
      try {
        // Get directly from localStorage for reliability
        const userProfileStr = localStorage.getItem('userProfile');
        if (userProfileStr) {
          const userProfile = JSON.parse(userProfileStr);
          if (userProfile && userProfile.name) {
            return userProfile.name;
          }
        }
      } catch (error) {
        console.error('Error parsing userProfile from localStorage', error);
      }
      
      // Default fallback
      return 'User';
    },
    userInitials() {
      if (!this.isAuthenticated) {
        return 'G';
      }
      
      try {
        // Get directly from localStorage for reliability
        const userProfileStr = localStorage.getItem('userProfile');
        if (userProfileStr) {
          const userProfile = JSON.parse(userProfileStr);
          if (userProfile && userProfile.name) {
            const name = userProfile.name;
            const nameParts = name.split(' ');
            
            // Calculate initials
            if (nameParts.length > 1) {
              return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
            }
            return nameParts[0][0].toUpperCase();
          }
        }
      } catch (error) {
        console.error('Error parsing userProfile from localStorage', error);
      }
      
      // Default fallback
      return 'U';
    }
  },
  methods: {
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen
      this.$emit('search-toggle', this.isSearchOpen)
    },
    toggleAccountMenu() {
      this.showAccountMenu = !this.showAccountMenu
    },
    closeAccountMenu() {
      this.showAccountMenu = false
    },
    logout() {
      // Close account menu first
      this.closeAccountMenu()
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('userProfile')
      
      // Force a page reload
      window.location.reload()
    },
    updateUserData() {
      // Check authentication state
      const token = localStorage.getItem('token')
      const storeAuth = this.$store.getters['auth/isAuthenticated']
      
      // Handle inconsistent state
      if (token && !storeAuth) {
        // Token exists but store says not authenticated
        this.$store.commit('auth/SET_TOKEN', token)
      } else if (!token && storeAuth) {
        // Store says authenticated but no token
        this.$store.commit('auth/SET_TOKEN', null)
      }
      
      // Handle user profile
      if (token) {
        // If authenticated, ensure profile is loaded
        const profile = this.$store.getters['user/userProfile']
        if (!profile || !profile.name) {
          // Try to load from localStorage
          try {
            const savedProfile = localStorage.getItem('userProfile')
            if (savedProfile) {
              this.$store.commit('user/SET_USER_PROFILE', JSON.parse(savedProfile))
            }
          } catch (error) {
            console.error('Error loading profile from localStorage', error)
          }
        }
      } else {
        // If not authenticated, clear profile
        this.$store.commit('user/SET_USER_PROFILE', null)
      }
      
      // Force UI update
      this.$forceUpdate()
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992
    }
  },
  mounted() {
    // Check screen size initially and on resize
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
    
    // Initialize user data
    this.updateUserData()
    
    // Listen for auth state changes
    window.addEventListener('user-auth-change', this.updateUserData)
    
    // Close account menu when clicking outside
    document.addEventListener('click', (event) => {
      const mobileProfile = document.querySelector('.mobile-profile')
      const desktopProfile = document.querySelector('.desktop-profile')
      const mobileDropdown = document.querySelector('.mobile-dropdown')
      const desktopDropdown = document.querySelector('.desktop-dropdown')
      
      if (
        this.showAccountMenu && 
        ((mobileProfile && !mobileProfile.contains(event.target) && mobileDropdown && !mobileDropdown.contains(event.target)) ||
        (desktopProfile && !desktopProfile.contains(event.target) && desktopDropdown && !desktopDropdown.contains(event.target)))
      ) {
        this.closeAccountMenu()
      }
    })
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('resize', this.checkScreenSize)
    window.removeEventListener('user-auth-change', this.updateUserData)
  }
}
</script>

<style lang="scss" scoped>
/* Variables */
:root {
  --primary-color: #FFD700;
  --secondary-color: #FF6B6B;
  --text-color: #333333;
  --border-color: #e9ecef;
  --error-color: #dc3545;
}

/* Header Styles */
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

/* Logo Styles */
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

.gradient-text {
  background: linear-gradient(45deg, #FFD700, #FF6B6B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation Styles */
.nav-link {
  padding: 0.5rem 1rem;
  color: #333333;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover, &.router-link-active {
    color: #FFD700;
  }
}

/* Button Styles */
.icon-button {
  background: none;
  border: none;
  color: #333333;
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
    background-color: rgba(255, 215, 0, 0.1);
    color: #FFD700;
  }
}

/* Profile Styles */
.mobile-profile, .desktop-profile {
  position: relative;
}

.user-profile {
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #FFD700, #FF6B6B);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Mobile/Desktop Actions */
.mobile-actions {
  display: none;
  align-items: center;
  gap: 0.75rem;
}

.desktop-actions {
  display: flex;
  align-items: center;
}

/* Dropdown Styles */
.desktop-dropdown, .mobile-dropdown {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1010;
}

.desktop-dropdown {
  position: absolute;
  top: 60px;
  right: 1rem;
  width: 220px;
}

.mobile-dropdown {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 12px 12px 0 0;
}

.dropdown-header {
  padding: 1rem;
  background: linear-gradient(45deg, #FFD700, #FF6B6B);
  color: white;
  font-weight: 600;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #333333;
  text-decoration: none;
  transition: all 0.2s ease;
  
  i {
    width: 20px;
    text-align: center;
  }
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
  
  &.text-danger {
    color: #dc3545;
    
    &:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }
  }
}

.dropdown-divider {
  height: 1px;
  background-color: #e9ecef;
  margin: 0.25rem 0;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1005;
}

/* Responsive Styles */
@media (min-width: 992px) {
  .desktop-actions {
    display: flex;
  }
  
  .mobile-actions {
    display: none;
  }
}

@media (max-width: 991px) {
  .mobile-actions {
    display: flex;
    margin-right: 3rem;
  }
  
  .desktop-actions {
    display: none;
  }
  
  .navbar-nav {
    padding: 1rem 0;
  }
  
  .nav-item {
    width: 100%;
    text-align: center;
    margin: 0.25rem 0;
  }
}

@media (max-width: 576px) {
  .mobile-actions {
    position: absolute;
    top: 0.75rem;
    right: 50%;
    transform: translateX(50%);
    margin-right: 0;
  }
  
  .navbar-toggler {
    margin-left: auto;
  }
  
  .navbar-brand {
    margin-right: 0;
  }
}
</style>