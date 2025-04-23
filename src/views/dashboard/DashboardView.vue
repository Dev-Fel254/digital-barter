<template>
  <div class="dashboard-wrapper">
    <!-- Mobile Header (only visible on mobile) -->
    <div class="mobile-header" v-if="isMobile">
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" v-if="!isProfileMenuOpen">
        <i class="fas fa-bars"></i>
      </button>
      <div class="mobile-logo">
        <h1>Digital Barter</h1>
      </div>
    </div>
    
    <div class="dashboard-container">
      <!-- Sidebar Navigation -->
      <aside class="sidebar" :class="{ 
        'sidebar-open': isMobileMenuOpen, 
        'sidebar-hover': sidebarHover && !isMobileMenuOpen && isMobile
      }"
      @mouseenter="handleSidebarHover(true)"
      @mouseleave="handleSidebarHover(false)">
        <div class="branding">
          <h1 class="logo-text">Digital Barter</h1>
          <button class="mobile-close" @click="toggleMobileMenu" v-if="isMobile">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <nav class="menu">
          <router-link to="/dashboard" class="menu-item" exact @click="closeMobileMenuOnClick">
            <i class="fas fa-home"></i>
            <span>Account Summary</span>
          </router-link>
          
          <router-link to="/dashboard/profile" class="menu-item" @click="closeMobileMenuOnClick">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </router-link>
          
          <router-link to="/dashboard/messages" class="menu-item" @click="closeMobileMenuOnClick">
            <i class="fas fa-envelope"></i>
            <span>Messages</span>
          </router-link>
          
          <router-link to="/dashboard/transactions" class="menu-item" @click="closeMobileMenuOnClick">
            <i class="fas fa-exchange-alt"></i>
            <span>Transactions</span>
          </router-link>
        </nav>
      </aside>
      
      <!-- Hover trigger area for mobile -->
      <div 
        class="sidebar-hover-trigger" 
        v-if="isMobile && !isMobileMenuOpen"
        @click="toggleMobileMenu"
      ></div>
      
      <!-- Main Content Area -->
      <main class="main-content">
        <router-view @profile-menu-toggle="handleProfileMenuToggle" />
      </main>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div 
        class="mobile-overlay" 
        v-if="isMobileMenuOpen" 
        @click="toggleMobileMenu"
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      isMobileMenuOpen: false,
      isMobile: false,
      isProfileMenuOpen: false,
      sidebarHover: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenuOnClick() {
      if (this.isMobile) {
        this.isMobileMenuOpen = false
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992
      if (!this.isMobile) {
        this.isMobileMenuOpen = false
      }
    },
    handleProfileMenuToggle(isOpen) {
      this.isProfileMenuOpen = isOpen
    },
    handleSidebarHover(isHovering) {
      if (this.isMobile && !this.isMobileMenuOpen) {
        this.sidebarHover = isHovering
      }
    }
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  }
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background: #f8f9fa;
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.dashboard-container {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
  max-width: 100%;
}

.mobile-header {
  display: none;
  background-color: white;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  height: 60px;
  
  .mobile-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    
    h1 {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(45deg, #FFD700, #FF6B6B);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.sidebar {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 1.5rem 1rem;
  color: white;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 220px;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
  
  // African pattern background
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15H15L30 0zm0 60l15-15H15L30 60zm0-30l15 15H15L30 30z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
}

.sidebar-hover-trigger {
  position: fixed;
  top: 60px;
  left: 0;
  width: 15px;
  height: 100%;
  z-index: 99;
}

.branding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  .logo-text {
    color: #FFD700;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  i {
    width: 20px;
    text-align: center;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
  }

  &.router-link-active {
    background: #FF6B6B;
    color: white;
  }
}

.main-content {
  padding: 1.5rem;
  min-height: 100vh;
  background: white;
  width: 100%;
}

.mobile-menu-toggle, .mobile-close {
  background: none;
  border: none;
  color: #1a1a1a;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-close {
  color: white;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Large Desktop Responsiveness
@media (min-width: 1921px) {
  .dashboard-container {
    max-width: 1920px;
    margin: 0 auto;
  }
}

// Desktop Responsiveness
@media (min-width: 992px) {
  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
  }
  
  .main-content {
    border-radius: 20px 0 0 20px;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
  }
}

// Mobile Responsiveness
@media (max-width: 991px) {
  .dashboard-wrapper {
    padding-top: 60px; // Space for the mobile header
  }
  
  .mobile-header {
    display: flex;
    align-items: center;
  }
  
  .dashboard-container {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: fixed;
    left: 0;
    top: 60px; // Below the mobile header
    bottom: 0;
    height: calc(100vh - 60px);
    transform: translateX(-100%);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    
    &.sidebar-open {
      transform: translateX(0);
    }
    
    &.sidebar-hover {
      transform: translateX(0);
    }
  }
  
  .mobile-menu-toggle {
    display: block;
    position: absolute;
    left: 1rem;
    z-index: 95;
  }
  
  .mobile-close {
    display: block;
  }
}

// Small Mobile Responsiveness
@media (max-width: 576px) {
  .mobile-header {
    padding: 0.75rem 0.5rem;
  }
  
  .main-content {
    padding: 1rem 0.75rem;
  }
}
</style>