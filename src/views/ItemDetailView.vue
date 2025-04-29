<template>
  <div class="item-detail-view">
    <div class="container">
      <div class="item-detail-container">
        <div class="item-image-container">
          <div class="item-image">
            <img :src="item && item.image" :alt="item ? item.title : 'Item'" v-img-fallback>
          </div>
        </div>
        
        <div class="item-info-container">
          <h1 class="item-title">{{ item ? item.title : 'Loading...' }}</h1>
          <div v-if="item" class="item-meta">
            <p class="item-posted">Posted On {{ item.postedOn || 'N/A' }}</p>
            <div class="posted-by">
              <span>Posted By</span>
              <span class="owner">{{ item.owner }}</span>
            </div>
            <p class="item-description">{{ item.description }}</p>
            
            <div class="item-details">
              <div class="detail-row">
                <span class="detail-label">Category</span>
                <span class="detail-value">{{ item.category || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Brand</span>
                <span class="detail-value">{{ item.brand || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Type</span>
                <span class="detail-value">{{ item.type || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Condition</span>
                <span class="detail-value">{{ item.condition || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Year</span>
                <span class="detail-value">{{ item.year || '-' }}</span>
              </div>
            </div>
            
            <div class="item-status" v-if="item.status">
              <span class="status-indicator" :class="item.status.toLowerCase()">{{ item.status }}</span>
            </div>
            
            <div class="action-buttons">
              <button class="primary-btn">MAKE OFFER</button>
            </div>
          </div>
          <div v-else class="loading">Loading item details...</div>
        </div>
      </div>
      
      <!-- Related Items Section -->
      <div class="related-items-section">
        <h2 class="section-title">RELATED ITEMS</h2>
        
        <div class="related-items-grid">
          <!-- Related Item 1 -->
          <div class="related-item-card">
            <div class="item-image">
              <img src="" alt="Food" v-img-fallback>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Food</h3>
              <p class="item-owner">Posted by Sara</p>
            </div>
          </div>
          
          <!-- Related Item 2 -->
          <div class="related-item-card">
            <div class="item-image">
              <img src="/images/items/book.jpg" alt="Fairy Tale book" v-img-fallback>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Shirt 2 For Swaping</h3>
              <p class="item-owner">Posted by vigitamaria</p>
            </div>
          </div>
          
          <!-- Related Item 3 -->
          <div class="related-item-card">
            <div class="item-image">
              <img src="/images/items/shirt.jpg" alt="Shirt" v-img-fallback>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Shirt 1 For Swaping</h3>
              <p class="item-owner">Posted by sara</p>
            </div>
          </div>
          
          <!-- Related Item 4 -->
          <div class="related-item-card">
            <div class="item-image">
              <img src="/images/items/iphone.jpg" alt="iPhone" v-img-fallback>
              <div class="item-tag">New</div>
            </div>
            <div class="item-info">
              <h3 class="item-title">Shirt For Swaping</h3>
              <p class="item-owner">Posted by sara</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetailView',
  data() {
    return {
      item: null,
      items: [
        {
          id: 'shirt',
          title: 'Shirt',
          owner: 'Eli',
          image: '/images/items/shirt.jpg',
          description: 'shirt for swap',
          category: 'Clothing',
          brand: '-',
          type: 'New',
          condition: 'New',
          year: '2020',
          points: 5,
          postedOn: '11/24/2020',
          status: 'Online'
        },
        {
          id: 'food',
          title: 'Food',
          owner: 'Sara',
          image: null,
          description: 'Food item for swap',
          category: 'Food',
          brand: '-',
          type: 'New',
          condition: 'New',
          year: '2020',
          status: 'Online'
        },
        {
          id: 'fairy-tale',
          title: 'Fairy Tale',
          owner: 'Test',
          image: '/images/items/book.jpg',
          description: 'Book for swap',
          category: 'Books',
          brand: '-',
          type: 'New',
          condition: 'New',
          year: '2020',
          status: 'Online'
        },
        {
          id: 'iphone',
          title: 'iPhone',
          owner: 'Janetest',
          image: '/images/items/iphone.jpg',
          description: 'iPhone for swap',
          category: 'Electronics',
          brand: 'Apple',
          type: 'New',
          condition: 'New',
          year: '2020',
          status: 'Online'
        }
      ]
    };
  },
  created() {
    // Get the item ID from the route parameters
    const itemId = this.$route.params.id;
    
    // Find the item in our mock database
    this.item = this.items.find(item => item.id === itemId);
    
    // If item not found, you could redirect or show an error
    if (!this.item) {
      console.error('Item not found:', itemId);
    }
  }
};
</script>

<style lang="scss" scoped>
.item-detail-view {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.item-detail-container {
  display: flex;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.item-image-container {
  flex: 0 0 45%;
  margin-right: 30px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
}

.item-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.no-image {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  color: #999;
  
  p {
    margin: 0;
    font-weight: 500;
  }
}

.item-info-container {
  flex: 1;
}

.item-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.item-meta {
  margin-bottom: 20px;
}

.item-posted {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.posted-by {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  .owner {
    font-weight: 600;
    margin-left: 5px;
  }
}

.item-description {
  margin: 15px 0;
  line-height: 1.6;
}

.item-details {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.detail-label {
  flex: 0 0 120px;
  font-weight: 600;
  color: #666;
}

.detail-value {
  flex: 1;
}

.item-status {
  margin: 20px 0;
}

.status-indicator {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  &.online {
    background-color: #e6f7e6;
    color: #28a745;
  }
  
  &.offline {
    background-color: #f8f9fa;
    color: #6c757d;
  }
}

.action-buttons {
  margin-top: 30px;
}

.primary-btn {
  background-color: #FFD700;
  color: #333;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: darken(#FFD700, 10%);
  }
}

/* Related Items Section */
.related-items-section {
  margin-top: 60px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #FFD700;
  }
}

.related-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.related-item-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
}

.related-item-card .item-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .no-image {
    height: 100%;
    border-radius: 0;
  }
  
  .item-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #4CAF50;
    color: white;
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 500;
  }
}

.related-item-card .item-info {
  padding: 15px;
  background-color: white;
}

.related-item-card .item-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.related-item-card .item-owner {
  font-size: 12px;
  color: #666;
}
</style>
