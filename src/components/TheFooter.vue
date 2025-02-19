<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="footer-links">
            <router-link to="/about" class="footer-link">About Us</router-link>
            <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
            <router-link to="/terms" class="footer-link">Terms</router-link>
            <router-link to="/faq" class="footer-link">FAQ</router-link>
            <router-link to="/contact" class="footer-link">Contact Us</router-link>
            <router-link to="/help" class="footer-link">Help</router-link>
          </div>
          <div class="copyright">
            © {{ currentYear }} Digital Barter. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  margin-top: 3rem;

  .footer-links {
    margin-bottom: 1rem;

    .footer-link {
      color: var(--text-color);
      text-decoration: none;
      margin: 0 1rem;
      font-size: 0.9rem;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .copyright {
    color: #6c757d;
    font-size: 0.85rem;
  }
}
</style>