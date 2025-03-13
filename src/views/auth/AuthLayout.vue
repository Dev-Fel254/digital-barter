<template>
  <div class="auth-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>