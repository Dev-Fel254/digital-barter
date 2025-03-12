<template>
  <div class="dashboard-container">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" :class="{ 'sidebar-mobile-open': isMobileMenuOpen }">
    <div class="branding">
      <h1 class="logo-text">Digital Barter</h1>
      <button class="mobile-close" @click="toggleMobileMenu" aria-label="Close Menu">
     <i class="fas fa-times"></i>
  </button>
</div>
      
      <nav class="menu">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="menu-item"
          @click="isMobileMenuOpen = false"
        >
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-menu-toggle" 
        @click="toggleMobileMenu"
        aria-label="Open Menu"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Dynamic Content -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      isMobileMenuOpen: false,
      menuItems: [
        { 
          path: '/dashboard', 
          title: 'Account Summary', 
          icon: 'fas fa-home' 
        },
        { 
          path: '/dashboard/profile', 
          title: 'Profile', 
          icon: 'fas fa-user' 
        },
        { 
          path: '/dashboard/messages', 
          title: 'Messages', 
          icon: 'fas fa-envelope' 
        },
        { 
          path: '/dashboard/transactions', 
          title: 'Transactions', 
          icon: 'fas fa-exchange-alt' 
        }
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    }
  },
  watch: {
    '$route'() {
      // Close mobile menu on route change
      this.isMobileMenuOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.branding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  .logo-text {
    color: #FFD700;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
}
.dashboard-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  background: #f8f9fa;
}

.sidebar {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem 1rem;
  color: white;
  position: fixed;
  height: 100vh;
  width: 240px;
  overflow-y: auto;
  transition: transform 0.3s ease;
  
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

.branding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  .logo {
    height: 40px;
    width: auto;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;

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
  margin-left: 240px;
  padding: 2rem;
  min-height: 100vh;
  background: white;
  border-radius: 20px 0 0 20px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
}

.mobile-menu-toggle, .mobile-close {
  display: none;
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

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Mobile Responsiveness
@media (max-width: 768px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    transform: translateX(-100%);
    z-index: 1000;
    
    &.sidebar-mobile-open {
      transform: translateX(0);
    }
  }

  .main-content {
    margin-left: 0;
    border-radius: 0;
    padding: 1rem;
  }

  .mobile-menu-toggle, .mobile-close {
    display: block;
  }
}

// Custom Scrollbar
.sidebar {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
}
</style>