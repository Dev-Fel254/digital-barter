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
          <ul class="navbar-nav ms-auto">
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
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
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
}
</style>