<template>
  <div class="home">
    <HeroSlider />
    <NewAdditions />
    <FeatureCards />
  </div>
</template>

<script>
import HeroSlider from '@/components/HeroSlider.vue'
import FeatureCards from '@/components/FeatureCards.vue'
import NewAdditions from '@/components/NewAdditions.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSlider,
    FeatureCards,
    NewAdditions
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
  width: 100%;
}
</style>