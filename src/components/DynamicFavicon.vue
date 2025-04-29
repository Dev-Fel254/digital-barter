<template>
  <!-- This component is intentionally empty but valid -->
  <div class="favicon-manager"></div>
</template>

<script>
export default {
  name: 'DynamicFavicon',
  mounted() {
    // This component is no longer used, but we keep it to avoid breaking changes
    console.log('DynamicFavicon component is deprecated. Using faviconManager.js instead.');
  }
}
</script>
