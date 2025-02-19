<template>
  <div class="home">
    <HeroSlider />
    <FeatureCards />
  </div>
</template>

<script>
import HeroSlider from '@/components/HeroSlider.vue'
import FeatureCards from '@/components/FeatureCards.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSlider,
    FeatureCards
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
  width: 100%;
}
</style>