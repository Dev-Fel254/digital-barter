<template>
  <footer class="footer">
    <div class="container">
      <nav class="footer-nav">
        <a href="/about">About Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact Us</a>
        <a href="/help">Help</a>
      </nav>
      <div class="copyright">
        {{ currentYear }} Digital Barter. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: white;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  flex-shrink: 0;
  width: 100%;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .footer-nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 1rem;

    a {
      color: var(--text-color);
      text-decoration: none;
      font-size: 0.9rem;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .copyright {
    text-align: center;
    color: var(--text-light);
    font-size: 0.85rem;
  }
}

// Add margin to the main content to prevent footer overlap
main {
  margin-bottom: 120px; // Adjust based on footer height
}
</style>