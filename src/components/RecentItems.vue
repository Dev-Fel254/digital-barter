<template>
  <section class="recent-items">
    <div class="section-header">
      <h2>Recent Additions</h2>
      <router-link to="/categories" class="view-all">View All</router-link>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="items.length === 0" class="no-items">
      <p>No items available yet. Be the first to add an item!</p>
      <router-link to="/dashboard/add-item" class="btn btn-primary" v-if="isAuthenticated">
        Add Item
      </router-link>
      <router-link to="/auth/login" class="btn btn-primary" v-else>
        Login to Add Item
      </router-link>
    </div>
    
    <div v-else class="items-grid">
      <div v-for="item in items" :key="item._id" class="item-card">
        <div class="item-image">
          <img :src="item.images && item.images.length > 0 ? item.images[0] : '/images/placeholder.jpg'" :alt="item.title">
        </div>
        <div class="item-details">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-category">{{ item.category }}</p>
          <div class="item-owner">
            <div class="owner-avatar">
              <img :src="item.user.profilePicture || '/images/default-avatar.jpg'" :alt="item.user.username">
              <span class="online-status" :class="{ 'online': item.user.isOnline }"></span>
            </div>
            <div class="owner-info">
              <span class="owner-name">{{ item.user.firstName }} {{ item.user.lastName }}</span>
              <span class="owner-location">{{ item.user.location }}</span>
            </div>
          </div>
          <router-link :to="`/items/${item._id}`" class="btn btn-outline-primary btn-sm mt-2">
            View Details
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-if="pagination && pagination.hasMore" class="pagination-container">
      <button @click="loadMore" class="btn btn-outline-primary" :disabled="loadingMore">
        <span v-if="loadingMore">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </span>
        <span v-else>Load More</span>
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getRecentItems } from '@/services/itemService';
import { isAuthenticated } from '@/services/authService';

export default {
  name: 'RecentItems',
  props: {
    limit: {
      type: Number,
      default: 8
    }
  },
  setup(props) {
    const items = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    const error = ref(null);
    const pagination = ref(null);
    const currentPage = ref(1);
    
    const fetchItems = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        const response = await getRecentItems(1, props.limit);
        items.value = response.items;
        pagination.value = response.pagination;
      } catch (err) {
        error.value = err.message || 'Failed to load recent items';
        console.error('Error fetching recent items:', err);
      } finally {
        loading.value = false;
      }
    };
    
    const loadMore = async () => {
      if (loadingMore.value) return;
      
      try {
        loadingMore.value = true;
        const nextPage = currentPage.value + 1;
        
        const response = await getRecentItems(nextPage, props.limit);
        items.value = [...items.value, ...response.items];
        pagination.value = response.pagination;
        currentPage.value = nextPage;
      } catch (err) {
        error.value = err.message || 'Failed to load more items';
        console.error('Error loading more items:', err);
      } finally {
        loadingMore.value = false;
      }
    };
    
    onMounted(fetchItems);
    
    return {
      items,
      loading,
      loadingMore,
      error,
      pagination,
      loadMore,
      isAuthenticated
    };
  }
}
</script>

<style lang="scss" scoped>
.recent-items {
  padding: 2rem 0;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h2 {
      margin: 0;
      color: #333333;
      font-weight: 600;
    }
    
    .view-all {
      color: #FFD700;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .loading-container {
    display: flex;
    justify-content: center;
    padding: 3rem 0;
  }
  
  .no-items {
    text-align: center;
    padding: 3rem 0;
    
    p {
      margin-bottom: 1.5rem;
      color: #666;
    }
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .item-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .item-image {
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      &:hover img {
        transform: scale(1.05);
      }
    }
    
    .item-details {
      padding: 1rem;
      
      .item-title {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
      }
      
      .item-category {
        color: #FF6B6B;
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
      }
      
      .item-owner {
        display: flex;
        align-items: center;
        margin-top: 0.75rem;
        
        .owner-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.75rem;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .online-status {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #ccc;
            border: 2px solid white;
            
            &.online {
              background-color: #4CAF50;
            }
          }
        }
        
        .owner-info {
          display: flex;
          flex-direction: column;
          
          .owner-name {
            font-size: 0.9rem;
            font-weight: 500;
            color: #333;
          }
          
          .owner-location {
            font-size: 0.8rem;
            color: #666;
          }
        }
      }
    }
  }
  
  .pagination-container {
    margin-top: 2rem;
    text-align: center;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .recent-items {
    .items-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }
}

@media (max-width: 576px) {
  .recent-items {
    .items-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
