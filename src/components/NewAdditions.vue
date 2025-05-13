<template>
  <section class="new-additions-section">
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
        <div v-if="loading" class="loading-container">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        
        <div v-else-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>
        
        <div v-else-if="items.length === 0" class="no-items-message">
          <p>No items available yet. Be the first to add an item!</p>
          <router-link to="/dashboard/add-item" class="btn btn-primary" v-if="isAuthenticated">
            Add Item
          </router-link>
          <router-link to="/auth/login" class="btn btn-primary" v-else>
            Login to Add Item
          </router-link>
        </div>
        
        <div v-else class="items-wrapper" ref="itemsWrapper">
          <!-- Dynamic Items -->
          <div v-for="item in items" :key="item._id" class="item-card">
            <div class="item-image">
              <img 
                :src="item.images && item.images.length > 0 ? item.images[0] : '/images/placeholder.jpg'" 
                :alt="item.title" 
                v-img-fallback
              >
              <div class="item-overlay">
                <div class="overlay-buttons">
                  <router-link :to="`/items/${item._id}`" class="overlay-btn view-btn" aria-label="View details">
                    <i class="fas fa-eye"></i>
                    <span class="tooltip">View Details</span>
                  </router-link>
                </div>
              </div>
              <div class="item-tag" v-if="isNewItem(item.createdAt)">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">{{ item.title }}</h3>
              <div class="item-owner-container">
                <div class="owner-avatar">
                  <img :src="item.user.profilePicture || '/images/default-avatar.jpg'" :alt="item.user.username">
                  <span class="online-status" :class="{ 'online': item.user.isOnline }"></span>
                </div>
                <p class="item-owner">Posted by {{ item.user.firstName }} {{ item.user.lastName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getRecentItems } from '@/services/itemService';

export default {
  name: 'NewAdditions',
  setup() {
    const items = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const itemsWrapper = ref(null);
    
    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('token');
    });
    
    const fetchRecentItems = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        // Fetch recent items with a limit of 10
        const response = await getRecentItems(1, 10);
        items.value = response.items;
      } catch (err) {
        console.error('Error fetching recent items:', err);
        error.value = err.message || 'Failed to load recent items';
      } finally {
        loading.value = false;
      }
    };
    
    const isNewItem = (createdAt) => {
      if (!createdAt) return false;
      
      // Consider items created in the last 3 days as new
      const itemDate = new Date(createdAt);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= 3;
    };
    
    const scrollItems = (direction) => {
      if (!itemsWrapper.value) return;
      
      const container = itemsWrapper.value;
      const scrollAmount = 300; // Adjust as needed
      
      if (direction === 'next') {
        container.scrollLeft += scrollAmount;
      } else {
        container.scrollLeft -= scrollAmount;
      }
    };
    
    onMounted(() => {
      fetchRecentItems();
    });
    
    return {
      items,
      loading,
      error,
      itemsWrapper,
      isAuthenticated,
      isNewItem,
      scrollItems
    };
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
    min-height: 200px;
  }
  
  .loading-container,
  .error-message,
  .no-items-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 20px;
    text-align: center;
  }
  
  .error-message {
    color: #dc3545;
  }
  
  .no-items-message {
    p {
      margin-bottom: 15px;
      color: #666;
    }
    
    .btn {
      background-color: #FFD700;
      border-color: #FFD700;
      color: #333;
      
      &:hover {
        background-color: darken(#FFD700, 10%);
        border-color: darken(#FFD700, 10%);
      }
    }
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .item-owner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 8px;
      
      .owner-avatar {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 5px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .online-status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ccc;
          border: 1px solid white;
          
          &.online {
            background-color: #4CAF50;
          }
        }
      }
      
      .item-owner {
        font-size: 12px;
        color: #777;
        margin: 0;
        text-align: center;
      }
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
