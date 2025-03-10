<template>
  <div class="hero-slider-container">
    <div class="hero-slider">
      <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="slide" v-for="(slide, index) in slides" :key="index">
          <div class="slide-content">
            <div class="image-container">
              <div class="image-wrapper">
                <img :src="slide.image" :alt="slide.alt">
                <div class="overlay"></div>
              </div>
              <div class="text-content">
                <h2>{{ slide.title }}</h2>
                <p>{{ slide.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="slider-nav">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :aria-label="'Go to slide ' + (index + 1)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSlider',
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          image: '/images/digital-barter-1.jpg',
          alt: 'Traditional Digital Barter',
          title: 'Embrace Traditional Values',
          description: 'Experience the fusion of tradition and technology in modern bartering'
        },
        {
          image: '/images/digital-barter-2.jpg',
          alt: 'Mobile Market Exchange',
          title: 'Trade Anywhere, Anytime',
          description: 'Connect with local traders using our digital platform'
        },
        {
          image: '/images/digital-barter-3.jpg',
          alt: 'Modern Exchange',
          title: 'Modern Trading Solutions',
          description: 'Exchange items seamlessly in our digital marketplace'
        }
      ],
      autoSlideInterval: null
    }
  },
  mounted() {
    this.startAutoSlide()
    this.updateHeight()
    window.addEventListener('resize', this.updateHeight)
  },
  beforeUnmount() {
    this.stopAutoSlide()
    window.removeEventListener('resize', this.updateHeight)
  },
  methods: {
    updateHeight() {
      const vh = window.innerHeight
      const headerHeight = 80
      const container = document.querySelector('.hero-slider-container')
      if (container) {
        container.style.height = `${vh - headerHeight}px`
      }
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval)
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    goToSlide(index) {
      this.currentSlide = index
      this.stopAutoSlide()
      this.startAutoSlide()
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-slider-container {
  width: 100%;
  position: relative;
  background: #1a1a1a;
  overflow: hidden;
}

.hero-slider {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: 100%;
  position: relative;
}

.slide {
  min-width: 100%;
  height: 100%;
  flex: 0 0 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.slide-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.5)
    );
  }
}

.text-content {
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  z-index: 2;
  width: 80%;
  max-width: 800px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
}

.slider-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 2;

  button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
    background: transparent;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;

    &.active {
      background: white;
      transform: scale(1.2);
    }
  }
}

// Media Queries
@media (max-width: 1024px) {
  .text-content {
    width: 90%;
    padding: 1.5rem;

    h2 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.25rem;
    }
  }
}

@media (max-width: 768px) {
  .text-content {
    bottom: 20%;
    padding: 1.25rem;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .image-wrapper {
    img {
      object-position: center 20%;
    }
  }
}

@media (max-width: 480px) {
  .text-content {
    width: 95%;
    padding: 1rem;
    bottom: 25%;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .slider-nav {
    bottom: 1rem;
    
    button {
      width: 8px;
      height: 8px;
    }
  }

  .image-wrapper {
    img {
      object-position: center 25%;
    }
  }
}
</style>