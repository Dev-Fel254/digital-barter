<template>
  <div class="my-items-view">
    <header class="section-header">
      <div class="header-content">
        <h1>My Items</h1>
        <p>Manage your items for swapping</p>
      </div>
      <div class="header-actions">
        <button class="action-btn primary" @click="showAddItemModal = true">
          <i class="fas fa-plus"></i>
          Add New Item
        </button>
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
          Items for Swap ({{ swapItems.length }})
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

    <!-- Items Grid -->
    <div class="items-container" v-if="activeTab === 'swap' && swapItems.length > 0">
      <div class="items-grid">
        <div 
          v-for="item in swapItems" 
          :key="item.id" 
          class="item-card"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.title">
            <div class="item-status" :class="item.status">{{ item.status }}</div>
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
              <span class="views">
                <i class="fas fa-eye"></i> {{ item.views }} views
              </span>
              <span class="offers">
                <i class="fas fa-handshake"></i> {{ item.offers }} offers
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
            <img :src="item.image" :alt="item.title">
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
    <div class="empty-state" v-else-if="activeTab === 'swap' && swapItems.length === 0">
      <i class="fas fa-box-open"></i>
      <h3>No Items for Swap</h3>
      <p>You haven't added any items for swapping yet.</p>
      <button class="action-btn primary" @click="showAddItemModal = true">
        Add Your First Item
      </button>
    </div>

    <div class="empty-state" v-else-if="activeTab === 'wish' && wishItems.length === 0">
      <i class="fas fa-heart"></i>
      <h3>Your Wishlist is Empty</h3>
      <p>Add items you're looking for to your wishlist.</p>
      <button class="action-btn primary" @click="showAddWishItemModal = true">
        Add to Wishlist
      </button>
    </div>

    <!-- Add Item Modal -->
    <div class="modal-overlay" v-if="showAddItemModal" @click="showAddItemModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Add New Item</h2>
          <button class="close-btn" @click="showAddItemModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addItem">
            <div class="form-group">
              <label for="itemTitle">Item Title</label>
              <input type="text" id="itemTitle" v-model="newItem.title" required>
            </div>
            <div class="form-group">
              <label for="itemCategory">Category</label>
              <select id="itemCategory" v-model="newItem.category" required>
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="itemDescription">Description</label>
              <textarea id="itemDescription" v-model="newItem.description" rows="4" required></textarea>
            </div>
            <div class="form-group">
              <label for="itemImage">Upload Image</label>
              <div class="file-upload">
                <input type="file" id="itemImage" @change="handleImageUpload">
                <div class="upload-placeholder">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload or drag and drop</span>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-cancel" @click="showAddItemModal = false">Cancel</button>
              <button type="submit" class="btn-submit">Add Item</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyItemsView',
  data() {
    return {
      activeTab: 'swap',
      showAddItemModal: false,
      showAddWishItemModal: false,
      newItem: {
        title: '',
        category: '',
        description: '',
        image: null
      },
      swapItems: [
        {
          id: 1,
          title: 'iPhone 12 Pro',
          description: 'Excellent condition, barely used. Comes with original box and accessories.',
          category: 'Electronics',
          image: 'https://via.placeholder.com/300x200?text=iPhone+12+Pro',
          status: 'active',
          createdAt: new Date('2025-03-15'),
          views: 42,
          offers: 3
        },
        {
          id: 2,
          title: 'Vintage Leather Jacket',
          description: 'Genuine leather jacket in excellent condition. Size L, brown color.',
          category: 'Clothing',
          image: 'https://via.placeholder.com/300x200?text=Leather+Jacket',
          status: 'active',
          createdAt: new Date('2025-04-01'),
          views: 28,
          offers: 1
        },
        {
          id: 3,
          title: 'PlayStation 5',
          description: 'Brand new PS5 with 2 controllers and 3 games included.',
          category: 'Electronics',
          image: 'https://via.placeholder.com/300x200?text=PlayStation+5',
          status: 'pending',
          createdAt: new Date('2025-04-10'),
          views: 87,
          offers: 5
        },
        {
          id: 4,
          title: 'Coffee Table Book Collection',
          description: 'Set of 5 coffee table books on architecture and design.',
          category: 'Books',
          image: 'https://via.placeholder.com/300x200?text=Book+Collection',
          status: 'active',
          createdAt: new Date('2025-03-25'),
          views: 15,
          offers: 0
        }
      ],
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
  mounted() {
    // Fetch user profile if needed
    this.$store.dispatch('user/fetchUserProfile');
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.newItem.image = URL.createObjectURL(file)
      }
    },
    addItem() {
      // Implementation would connect to backend API
      const newItemWithId = {
        ...this.newItem,
        id: Date.now(),
        status: 'active',
        createdAt: new Date(),
        views: 0,
        offers: 0,
        image: this.newItem.image || 'https://via.placeholder.com/300x200?text=New+Item'
      }
      
      this.swapItems.unshift(newItemWithId)
      this.showAddItemModal = false
      this.newItem = {
        title: '',
        category: '',
        description: '',
        image: null
      }
    },
    editItem(item) {
      // Implementation would open edit modal with item data
      console.log('Edit item:', item)
    },
    confirmDeleteItem(item) {
      if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
        this.swapItems = this.swapItems.filter(i => i.id !== item.id)
      }
    },
    editWishItem(item) {
      // Implementation would open edit modal with wishlist item data
      console.log('Edit wishlist item:', item)
    },
    confirmDeleteWishItem(item) {
      if (confirm(`Are you sure you want to remove "${item.title}" from your wishlist?`)) {
        this.wishItems = this.wishItems.filter(i => i.id !== item.id)
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
      transition: transform 0.5s ease;
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
      
      &.active {
        background: rgba(46, 204, 113, 0.9);
        color: white;
      }
      
      &.pending {
        background: rgba(255, 215, 0, 0.9);
        color: #1a1a1a;
      }
      
      &.inactive {
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #eee;
  
  h2 {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #999;
    cursor: pointer;
    
    &:hover {
      color: #333;
    }
  }
}

.modal-body {
  padding: 1.25rem;
}

.form-group {
  margin-bottom: 1.25rem;
  
  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: #FFD700;
      box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
    }
  }
  
  textarea {
    resize: vertical;
  }
}

.file-upload {
  position: relative;
  border: 2px dashed #ddd;
  border-radius: 6px;
  padding: 2rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #FFD700;
  }
  
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  
  .upload-placeholder {
    i {
      font-size: 2rem;
      color: #ddd;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    span {
      font-size: 0.9rem;
      color: #999;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  
  button {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-cancel {
    background: none;
    border: 1px solid #ddd;
    color: #666;
    
    &:hover {
      background: #f5f5f5;
    }
  }
  
  .btn-submit {
    background: #FFD700;
    border: none;
    color: #1a1a1a;
    
    &:hover {
      background: darken(#FFD700, 10%);
    }
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
