<template>
  <div class="my-items-view">
    <header class="section-header">
      <div class="header-content">
        <h1>My Items</h1>
        <p>Manage your items for swapping</p>
      </div>
      <div class="header-actions">
        <router-link to="/dashboard/add-item" class="action-btn primary">
          <i class="fas fa-plus"></i>
          Add New Item
        </router-link>
        <button class="action-btn secondary">
          <i class="fas fa-filter"></i>
          Filter
        </button>
      </div>
    </header>

    <!-- Tabs -->
    <div class="tabs-container">
      <div class="tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'swap' }"
          @click="activeTab = 'swap'"
        >
          Items for Swap ({{ userItems.length }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'wish' }"
          @click="activeTab = 'wish'"
        >
          Wishlist ({{ wishItems.length }})
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Items Grid -->
    <div class="items-container" v-if="activeTab === 'swap' && userItems.length > 0">
      <div class="items-grid">
        <div 
          v-for="item in userItems" 
          :key="item._id" 
          class="item-card"
        >
          <div class="item-image">
            <img :src="item.images && item.images.length > 0 ? item.images[0] : '/images/placeholder.jpg'" :alt="item.title" v-img-fallback>
            <div class="item-status" :class="item.status ? item.status.toLowerCase() : 'available'">{{ item.status || 'Available' }}</div>
            <div class="item-actions">
              <button class="icon-btn edit" @click="editItem(item)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="icon-btn delete" @click="confirmDeleteItem(item)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <div class="item-meta">
              <span class="category">
                <i class="fas fa-tag"></i> {{ item.category }}
              </span>
              <span class="date">
                <i class="fas fa-calendar"></i> {{ formatDate(item.createdAt) }}
              </span>
            </div>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-footer">
              <span class="value">
                <i class="fas fa-dollar-sign"></i> ${{ item.estimatedValue || 0 }}
              </span>
              <span class="condition">
                <i class="fas fa-star"></i> {{ item.condition || 'Good' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="items-container" v-else-if="activeTab === 'wish' && wishItems.length > 0">
      <div class="items-grid">
        <div 
          v-for="item in wishItems" 
          :key="item.id" 
          class="item-card wish-item"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.title" v-img-fallback>
            <div class="item-actions">
              <button class="icon-btn edit" @click="editWishItem(item)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="icon-btn delete" @click="confirmDeleteWishItem(item)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <div class="item-meta">
              <span class="category">
                <i class="fas fa-tag"></i> {{ item.category }}
              </span>
              <span class="date">
                <i class="fas fa-calendar"></i> {{ formatDate(item.createdAt) }}
              </span>
            </div>
            <p class="item-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty States -->
    <div class="empty-state" v-else-if="activeTab === 'swap' && userItems.length === 0 && !loading">
      <i class="fas fa-box-open"></i>
      <h3>No Items for Swap</h3>
      <p>You haven't added any items for swapping yet.</p>
      <router-link to="/dashboard/add-item" class="action-btn primary">
        Add Your First Item
      </router-link>
    </div>

    <div class="empty-state" v-else-if="activeTab === 'wish' && wishItems.length === 0 && !loading">
      <i class="fas fa-heart"></i>
      <h3>Your Wishlist is Empty</h3>
      <p>Add items you're looking for to your wishlist.</p>
      <button class="action-btn primary" @click="showAddWishItemModal = true">
        Add to Wishlist
      </button>
    </div>
  </div>
</template>

<script>
import { getUserItems, deleteItem } from '@/services/itemService';

export default {
  name: 'MyItemsView',
  data() {
    return {
      activeTab: 'swap',
      showAddWishItemModal: false,
      loading: false,
      error: null,
      userItems: [],
      wishItems: [
        {
          id: 101,
          title: 'Mountain Bike',
          description: 'Looking for a mountain bike in good condition. Preferably a Trek or Specialized.',
          category: 'Sports',
          image: 'https://via.placeholder.com/300x200?text=Mountain+Bike',
          createdAt: new Date('2025-04-05')
        },
        {
          id: 102,
          title: 'DSLR Camera',
          description: 'Interested in a Canon or Nikon DSLR camera with lens kit.',
          category: 'Electronics',
          image: 'https://via.placeholder.com/300x200?text=DSLR+Camera',
          createdAt: new Date('2025-04-12')
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/userProfile'] || { name: 'Guest' };
    }
  },
  async mounted() {
    // Fetch user profile if needed
    this.$store.dispatch('user/fetchUserProfile');
    await this.fetchUserItems();
  },
  methods: {
    async fetchUserItems() {
      try {
        this.loading = true;
        this.error = null;
        const items = await getUserItems();
        this.userItems = items;
      } catch (err) {
        this.error = err.message || 'Failed to load your items';
        console.error('Error fetching user items:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    editItem(item) {
      // Implementation would open edit modal with item data
      console.log('Edit item:', item);
      alert('Edit functionality coming soon!');
    },
    async confirmDeleteItem(item) {
      if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
        try {
          await deleteItem(item._id);
          this.userItems = this.userItems.filter(i => i._id !== item._id);
          alert('Item deleted successfully!');
        } catch (error) {
          alert('Failed to delete item: ' + error.message);
        }
      }
    },
    editWishItem(item) {
      // Implementation would open edit modal with wishlist item data
      console.log('Edit wishlist item:', item);
      alert('Edit wishlist functionality coming soon!');
    },
    confirmDeleteWishItem(item) {
      if (confirm(`Are you sure you want to remove "${item.title}" from your wishlist?`)) {
        this.wishItems = this.wishItems.filter(i => i.id !== item.id);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-items-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .header-content {
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
      color: #333;
    }
    
    p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }
  }
  
  .header-actions {
    display: flex;
    gap: 0.75rem;
  }
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &.primary {
    background: #FFD700;
    color: #1a1a1a;
    
    &:hover {
      background: darken(#FFD700, 10%);
    }
  }
  
  &.secondary {
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
    border: 1px solid rgba(255, 215, 0, 0.3);
    
    &:hover {
      background: rgba(255, 215, 0, 0.2);
    }
  }
}

.tabs-container {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.tabs {
  display: flex;
  gap: 1rem;
}

.tab-btn {
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  position: relative;
  
  &.active {
    color: #FFD700;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #FFD700;
    }
  }
  
  &:hover:not(.active) {
    color: #333;
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  &.alert-danger {
    background-color: rgba(244, 67, 54, 0.1);
    color: #f44336;
    border: 1px solid rgba(244, 67, 54, 0.2);
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.item-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    .item-actions {
      opacity: 1;
    }
  }
  
  &.wish-item {
    border: 1px dashed #FFD700;
    
    .item-image::before {
      content: 'Wishlist';
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255, 215, 0, 0.9);
      color: #1a1a1a;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      z-index: 1;
    }
  }
  
  .item-image {
    position: relative;
    height: 180px;
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
    
    .item-status {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: capitalize;
      z-index: 1;
      
      &.available {
        background: rgba(46, 204, 113, 0.9);
        color: white;
      }
      
      &.pending {
        background: rgba(255, 215, 0, 0.9);
        color: #1a1a1a;
      }
      
      &.traded {
        background: rgba(149, 165, 166, 0.9);
        color: white;
      }
    }
    
    .item-actions {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: flex;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
  }
  
  .item-details {
    padding: 1rem;
    
    h3 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .item-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.75rem;
      font-size: 0.8rem;
      color: #666;
      
      i {
        margin-right: 0.25rem;
      }
    }
    
    .item-description {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.75rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .item-footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: #999;
      
      i {
        margin-right: 0.25rem;
      }
    }
  }
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.edit {
    background: rgba(255, 255, 255, 0.9);
    color: #FFD700;
    
    &:hover {
      background: #FFD700;
      color: white;
    }
  }
  
  &.delete {
    background: rgba(255, 255, 255, 0.9);
    color: #FF6B6B;
    
    &:hover {
      background: #FF6B6B;
      color: white;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  i {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1.5rem;
  }
}

// Responsive styles
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    .header-actions {
      width: 100%;
      
      .action-btn {
        flex: 1;
      }
    }
  }
  
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 576px) {
  .items-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    width: 100%;
    
    .tab-btn {
      flex: 1;
      text-align: center;
    }
  }
}
</style>