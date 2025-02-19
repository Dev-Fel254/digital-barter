<template>
  <div class="hero-slider">
    <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button v-for="(slide, index) in slides" 
                :key="'indicator-' + index"
                type="button"
                :data-bs-target="'#mainCarousel'"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                :aria-current="index === 0"
                :aria-label="'Slide ' + (index + 1)">
        </button>
      </div>
      
      <div class="carousel-inner">
        <div v-for="(slide, index) in slides" 
             :key="'slide-' + index"
             class="carousel-item"
             :class="{ active: index === 0 }">
          <div class="carousel-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
            <button class="btn btn-primary gradient-bg">{{ slide.buttonText }}</button>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSlider',
  data() {
    return {
      slides: [
        {
          title: 'Create Your Own Swapping Site!',
          description: 'Join our community and start trading items you no longer need.',
          buttonText: 'Get Started'
        },
        {
          title: 'Trade Smarter, Not Harder',
          description: 'Find the items you want by trading what you have.',
          buttonText: 'Explore Now'
        },
        {
          title: 'Join Our Growing Community',
          description: 'Connect with others and make meaningful trades.',
          buttonText: 'Join Now'
        }
      ]
    }
  },
  mounted() {
    // Initialize Bootstrap carousel
    if (typeof window !== 'undefined') {
      import('bootstrap').then(bootstrap => {
        new bootstrap.Carousel(document.getElementById('mainCarousel'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-slider {
  margin-bottom: 3rem;
  width: 100%;

  .carousel {
    width: 100%;
  }

  .carousel-item {
    height: 400px;
    background: linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,107,107,0.1));
    width: 100%;
  }

  .carousel-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--text-color);
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
    }

    .btn {
      border: none;
      padding: 0.75rem 2rem;
      font-weight: 500;
      color: white;
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>