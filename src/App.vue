<template>
  <div id="app">
    <TheHeader />
    <main class="main-content">
      <router-view/>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
:root {
  --primary-color: #FFD700; /* Logo yellow */
  --primary-color-rgb: 255, 215, 0;
  --secondary-color: #FF6B6B; /* Logo gradient pink/red */
  --secondary-color-rgb: 255, 107, 107;
  --accent-color: #FF8C00; /* Logo gradient orange */
  --text-color: #333333;
  --text-light: #666666;
  --background-light: #f8f9fa;
  --border-color: #dddddd;
  --success-color: #4CAF50;
  --error-color: #f44336;
  --warning-color: #ff9800;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-light);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Form Styles
.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }
}

// Button Styles
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  
  &-primary {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.2);
    }
  }
  
  &-outline {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    
    &:hover {
      background: var(--primary-color);
      color: white;
    }
  }
}

// Animation Classes
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Utility Classes
.text-center { text-align: center; }
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }

// Logo-specific gradients
.gradient-text {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-bg {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
}

.main-content {
  flex: 1 0 auto;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
