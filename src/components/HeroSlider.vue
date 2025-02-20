<template>
  <div class="hero-slider-container">
    <div class="hero-slider">
      <div class="side-panel left"></div>
      <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="slide" v-for="(slide, index) in slides" :key="index">
          <div class="slide-content">
            <div class="image-container">
              <div class="image-wrapper">
                <img :src="slide.image" :alt="slide.alt">
                <div class="overlay"></div>
              </div>
            </div>
            <div class="text-content">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="side-panel right"></div>
      
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
          image: '/images/slide1.jpg',
          alt: 'Digital Barter Initiative',
          title: 'Welcome to Digital Barter',
          description: 'Exchange items easily and securely with our community'
        },
        {
          image: '/images/slide2.jpg',
          alt: 'Digital Exchange Process',
          title: 'Simple Exchange Process',
          description: 'Trade items seamlessly using our digital platform'
        },
        {
          image: '/images/slide3.jpg',
          alt: 'Community Trading',
          title: 'Community-Driven Trading',
          description: 'Connect with local traders and exchange items safely'
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
      const headerHeight = 80 // Adjust this value based on your header height
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
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.1),
    rgba(255, 107, 107, 0.1)
  );
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

.side-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 15%;
  z-index: 1;

  &.left {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 215, 0, 0.2),
      rgba(255, 215, 0, 0.05)
    );
  }

  &.right {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(255, 107, 107, 0.2),
      rgba(255, 107, 107, 0.05)
    );
  }
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: 70%; // Center portion for slides
  margin: 0 auto;
}

.slide {
  min-width: 100%;
  height: 100%;
}

.slide-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 215, 0, 0.1),
      rgba(255, 107, 107, 0.1)
    );
    mix-blend-mode: multiply;
  }
}

.text-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
  color: white;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
}

.slider-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 2rem;

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

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}

@media (max-width: 768px) {
  .side-panel {
    width: 10%;
  }

  .slides {
    width: 80%;
  }

  .text-content {
    padding: 1.5rem;

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
}
</style>