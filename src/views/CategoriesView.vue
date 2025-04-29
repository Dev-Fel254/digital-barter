<template>
  <div class="categories-page">
    <div class="container">
      <div class="row">
        <!-- Categories Sidebar -->
        <div class="col-md-3 categories-sidebar">
          <h2 class="categories-title">Categories</h2>
          <ul class="category-list">
            <li v-for="(category, index) in categories" :key="index" class="category-item">
              <a href="#" class="category-link" @click.prevent="filterByCategory(category.name)">
                <i class="fas fa-angle-right"></i>
                <span>{{ category.name }}</span>
                <span class="item-count">{{ category.count }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Main Content Area -->
        <div class="col-md-9">
          <!-- Search and Filter Bar -->
          <div class="search-filter-bar">
            <div class="search-box">
              <select class="form-select category-select">
                <option value="">Category</option>
                <option v-for="(category, index) in categories" :key="index" :value="category.name">
                  {{ category.name }}
                </option>
              </select>
              <input type="text" class="form-control search-input" placeholder="Search" v-model="searchQuery">
              <button class="btn btn-primary search-btn" @click="searchItems">GO</button>
            </div>
            <div class="view-options">
              <button class="btn view-btn" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
                <i class="fas fa-th-large"></i>
              </button>
              <button class="btn view-btn" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>

          <!-- Toggle Buttons -->
          <div class="toggle-buttons">
            <button class="btn swap-btn" :class="{ active: activeTab === 'swap' }" @click="activeTab = 'swap'">
              SWAP({{ swapItems.length }})
            </button>
            <button class="btn wish-btn" :class="{ active: activeTab === 'wish' }" @click="activeTab = 'wish'">
              WISH({{ wishItems.length }})
            </button>
          </div>

          <!-- Items Grid -->
          <div class="items-grid">
            <div v-for="(item, index) in filteredItems" :key="index" class="item-card">
              <div class="item-status" :class="item.status.toLowerCase()">{{ item.status }}</div>
              <div class="item-badge" v-if="item.condition">{{ item.condition }}</div>
              <div class="item-image">
                <img :src="item.image" :alt="item.name" v-img-fallback>
              </div>
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <div class="item-points">{{ item.points }} Points</div>
                <div class="item-owner">Posted By: {{ item.owner }}</div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredItems.length === 0" class="empty-state">
              <div class="no-items-message">
                <i class="fas fa-box-open"></i>
                <p>No items found in this category</p>
                <button class="btn btn-primary" @click="activeTab === 'swap' ? openAddSwapModal() : openAddWishModal()">
                  Add {{ activeTab === 'swap' ? 'Swap' : 'Wish' }} Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Item Modal (will be implemented later) -->
  </div>
</template>

<script>
export default {
  name: 'CategoriesView',
  data() {
    return {
      viewMode: 'grid',
      activeTab: 'swap',
      searchQuery: '',
      selectedCategory: null,
      categories: [
        { name: 'Clothing', count: 8 },
        { name: 'Home & Kitchen', count: 5 },
        { name: 'Books & Comics', count: 5 },
        { name: 'Jewelry & Watches', count: 3 },
        { name: 'Automotive', count: 2 },
        { name: 'Furniture', count: 4 },
        { name: 'TV, Video & Audio', count: 2 },
        { name: 'Mobile Phones', count: 3 }
      ],
      swapItems: [
        {
          id: 1,
          name: 'Shirt',
          points: 5,
          image: '/img/items/shirt.jpg',
          category: 'Clothing',
          owner: 'sara',
          status: 'Offline',
          condition: 'New'
        },
        {
          id: 2,
          name: 'food',
          points: 3,
          image: '',
          category: 'Home & Kitchen',
          owner: 'sara',
          status: 'Offline',
          condition: 'New'
        },
        {
          id: 3,
          name: 'Large Travel Bag',
          points: 10,
          image: '/img/items/travel-bag.jpg',
          category: 'Clothing',
          owner: 'Kurt987',
          status: 'Offline',
          condition: 'Good'
        }
      ],
      wishItems: [
        {
          id: 101,
          name: 'Laptop',
          points: 50,
          category: 'Electronics',
          owner: 'john_doe',
          status: 'Online'
        },
        {
          id: 102,
          name: 'Coffee Maker',
          points: 15,
          category: 'Home & Kitchen',
          owner: 'coffee_lover',
          status: 'Online'
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      let items = this.activeTab === 'swap' ? this.swapItems : this.wishItems;
      
      // Apply category filter if selected
      if (this.selectedCategory) {
        items = items.filter(item => item.category === this.selectedCategory);
      }
      
      // Apply search filter if query exists
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.category.toLowerCase().includes(query) ||
          item.owner.toLowerCase().includes(query)
        );
      }
      
      return items;
    }
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category;
    },
    searchItems() {
      // The filtering is handled by the computed property
      console.log('Searching for:', this.searchQuery);
    },
    openAddSwapModal() {
      console.log('Opening add swap item modal');
      // Will implement modal functionality later
    },
    openAddWishModal() {
      console.log('Opening add wish item modal');
      // Will implement modal functionality later
    }
  }
}
</script>

<style lang="scss" scoped>
.categories-page {
  padding: 2rem 0;
  background-color: var(--background-light);
}

.categories-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.categories-sidebar {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 0.5rem;
}

.category-link {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    color: var(--primary-color);
  }
  
  i {
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
  
  .item-count {
    margin-left: auto;
    background-color: #f0f0f0;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
    color: var(--text-light);
  }
}

.search-filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.search-box {
  display: flex;
  gap: 0.5rem;
  flex-grow: 1;
  
  .category-select {
    width: 150px;
  }
  
  .search-input {
    flex-grow: 1;
  }
  
  .search-btn {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: black;
    font-weight: 600;
    
    &:hover {
      background-color: darken(#FFD700, 10%);
      border-color: darken(#FFD700, 10%);
    }
  }
}

.view-options {
  display: flex;
  gap: 0.5rem;
  
  .view-btn {
    background-color: white;
    border: 1px solid var(--border-color);
    color: var(--text-light);
    
    &.active {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      color: black;
    }
  }
}

.toggle-buttons {
  display: flex;
  margin-bottom: 1.5rem;
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border-radius: 0;
    flex: 1;
    text-align: center;
    background-color: #f0f0f0;
    color: var(--text-color);
    
    &.active {
      background-color: var(--primary-color);
      color: black;
    }
  }
  
  .swap-btn {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  
  .wish-btn {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.item-card {
  position: relative;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .item-status {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    z-index: 1;
    
    &.online {
      background-color: rgba(76, 175, 80, 0.9);
      color: white;
    }
    
    &.offline {
      background-color: rgba(158, 158, 158, 0.9);
      color: white;
    }
  }
  
  .item-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    z-index: 1;
    
    &.new {
      background-color: rgba(33, 150, 243, 0.9);
      color: white;
    }
    
    &.good {
      background-color: rgba(76, 175, 80, 0.9);
      color: white;
    }
  }
  
  .item-image {
    height: 200px;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  .item-details {
    padding: 1rem;
    
    .item-name {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .item-points {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .item-owner {
      font-size: 0.9rem;
      color: var(--text-light);
    }
  }
}

.empty-state {
  grid-column: 1 / -1;
  padding: 3rem;
  text-align: center;
  
  .no-items-message {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    
    i {
      font-size: 3rem;
      color: var(--text-light);
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      color: var(--text-light);
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .search-filter-bar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-box {
    width: 100%;
  }
  
  .view-options {
    width: 100%;
    justify-content: center;
  }
}
</style>