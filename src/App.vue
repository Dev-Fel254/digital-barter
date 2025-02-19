<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <TheHeader />
    <router-view class="flex-grow-1"></router-view>
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
@import 'bootstrap/dist/css/bootstrap.css';
@import '@fortawesome/fontawesome-free/css/all.css';

:root {
  --primary-color: #FFD700;
  --secondary-color: #FF6B6B;
  --text-color: #333333;
}

#app {
  font-family: 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}

.gradient-bg {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.page-content {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
  
  h1 {
    margin-bottom: 2rem;
    color: var(--text-color);
  }
}
</style>
