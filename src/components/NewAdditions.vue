<template>
  <section v-if="isAuthenticated" class="new-additions-section">
    <div class="container">
      <h2 class="section-title">NEW ADDITIONS</h2>
      
      <div class="navigation-controls">
        <button class="nav-button prev" @click="scrollItems('prev')" aria-label="Previous items">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="nav-button next" @click="scrollItems('next')" aria-label="Next items">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div class="items-container">
        <div class="items-wrapper" ref="itemsWrapper">
           <!-- Item 1 -->
          <div class="item-card">
            <div class="item-image">
              <img src="/images/items/shirt.jpg" alt="Blue shirt" v-img-fallback>
              <div class="item-overlay">
                <div class="overlay-buttons">
                  <router-link :to="`/item/shirt`" class="overlay-btn view-btn" aria-label="View details">
                    <i class="fas fa-eye"></i>
                    <span class="tooltip">View Details</span>
                  </router-link>
                </div>
              </div>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Shirt</h3>
              <p class="item-owner">Posted by Eli</p>
            </div>
          </div>
          
          <!-- Item 2 -->
          <div class="item-card">
            <div class="item-image">
              <img src="" alt="Food" v-img-fallback>
              <div class="item-overlay">
                <div class="overlay-buttons">
                  <router-link :to="`/item/food`" class="overlay-btn view-btn" aria-label="View details">
                    <i class="fas fa-eye"></i>
                    <span class="tooltip">View Details</span>
                  </router-link>
                </div>
              </div>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Food</h3>
              <p class="item-owner">Posted by Sara</p>
            </div>
          </div>
          
          <!-- Item 3 -->
          <div class="item-card">
            <div class="item-image">
              <img src="/images/items/book.jpg" alt="Fairy Tale book" v-img-fallback>
              <div class="item-overlay">
                <div class="overlay-buttons">
                  <router-link :to="`/item/fairy-tale`" class="overlay-btn view-btn" aria-label="View details">
                    <i class="fas fa-eye"></i>
                    <span class="tooltip">View Details</span>
                  </router-link>
                </div>
              </div>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Fairy Tale</h3>
              <p class="item-owner">Posted by Test</p>
            </div>
          </div>
          
          <!-- Item 4 -->
          <div class="item-card">
            <div class="item-image">
              <img src="/images/items/iphone.jpg" alt="iPhone" v-img-fallback>
              <div class="item-overlay">
                <div class="overlay-buttons">
                  <router-link :to="`/item/iphone`" class="overlay-btn view-btn" aria-label="View details">
                    <i class="fas fa-eye"></i>
                    <span class="tooltip">View Details</span>
                  </router-link>
                </div>
              </div>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">iPhone</h3>
              <p class="item-owner">Posted by Janetest</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<script>
export default {
  name: 'NewAdditions',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    scrollItems(direction) {
      const container = this.$refs.itemsWrapper;
      const scrollAmount = 300; // Adjust as needed
      
      if (direction === 'next') {
        container.scrollLeft += scrollAmount;
      } else {
        container.scrollLeft -= scrollAmount;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-additions-section {
  padding: 40px 0;
  background-color: #f8f9fa;
  position: relative;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
  }
  
  .section-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 25px;
    font-weight: 600;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: #FFD700; /* Gold color from African theme */
    }
  }
  
  .navigation-controls {
    position: absolute;
    top: 0;
    right: 15px;
    display: flex;
    gap: 10px;
    
    .nav-button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #FFD700;
        border-color: #FFD700;
        color: #fff;
      }
      
      i {
        font-size: 12px;
      }
    }
  }
  
  .items-container {
    overflow: hidden;
    position: relative;
    margin: 0 -10px;
  }
  
  .items-wrapper {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 10px;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
  
  .item-card {
    min-width: 220px;
    max-width: 220px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      
      .item-overlay {
        opacity: 1;
      }
    }
  }
  
  .item-image {
    height: 200px;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .no-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: #f0f0f0;
      color: #999;
      font-size: 14px;
      text-align: center;
      padding: 20px;
      
      p {
        margin: 0;
        font-weight: 500;
      }
    }
    
    .item-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .overlay-buttons {
      display: flex;
      gap: 15px;
    }
    
    .overlay-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      text-decoration: none;
      color: inherit;
      
      &:hover {
        background-color: #FFD700;
        color: #fff;
        
        .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      }
      
      i {
        font-size: 16px;
      }
      
      .tooltip {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%) translateY(5px);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 10;
      }
    }
    
    .item-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #4CAF50;
      color: white;
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 3px;
      text-transform: uppercase;
      font-weight: 500;
    }
  }
  
  .item-info {
    padding: 15px;
    
    .item-title {
      font-size: 16px;
      margin: 0 0 5px;
      color: #333;
      font-weight: 600;
      text-align: center;
    }
    
    .item-owner {
      font-size: 12px;
      color: #777;
      margin: 0;
      text-align: center;
    }
  }
}

@media (max-width: 768px) {
  .new-additions-section {
    .items-wrapper {
      gap: 15px;
    }
    
    .item-card {
      min-width: 180px;
      max-width: 180px;
    }
    
    .item-image {
      height: 160px;
    }
  }
}

</style>
