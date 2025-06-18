<template>
  <div class="add-item-view">
    <header class="page-header">
      <div class="header-content">
        <h1>Add New Item</h1>
        <p>List an item for swapping or trading</p>
      </div>
      <router-link to="/dashboard/my-items" class="back-btn">
        <i class="fas fa-arrow-left"></i>
        Back to My Items
      </router-link>
    </header>

    <div class="add-item-container">
      <form @submit.prevent="submitItem" class="item-form">
        <!-- Basic Information -->
        <section class="form-section">
          <h2>Basic Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="title">Item Title *</label>
              <input 
                type="text" 
                id="title" 
                v-model="item.title" 
                required
                placeholder="Enter item title"
                maxlength="50"
              >
              <small>{{ item.title.length }}/50 characters</small>
            </div>

            <div class="form-group">
              <label for="category">Category *</label>
              <select id="category" v-model="item.category" required>
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
                <option value="Home">Home & Garden</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="condition">Condition *</label>
              <select id="condition" v-model="item.condition" required>
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div class="form-group">
              <label for="estimatedValue">Estimated Value ($) *</label>
              <input 
                type="number" 
                id="estimatedValue" 
                v-model="item.estimatedValue" 
                required
                min="0" 
                step="0.01"
                placeholder="0.00"
              >
            </div>

            <div class="form-group full-width">
              <label for="location">Location *</label>
              <input 
                type="text" 
                id="location" 
                v-model="item.location" 
                required
                placeholder="City, State/Province"
              >
            </div>

            <div class="form-group full-width">
              <label for="description">Description *</label>
              <textarea 
                id="description" 
                v-model="item.description" 
                required
                rows="4"
                placeholder="Describe your item in detail..."
                maxlength="500"
              ></textarea>
              <small>{{ item.description.length }}/500 characters</small>
            </div>
          </div>
        </section>

        <!-- Images Section -->
        <section class="form-section">
          <h2>Images</h2>
          <div class="images-container">
            <div class="image-upload-area">
              <div class="upload-zone" @click="triggerFileInput" @drop="handleDrop" @dragover.prevent @dragenter.prevent>
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Click to upload or drag and drop</p>
                <small>Supported formats: JPG, PNG, GIF (Max 5MB each)</small>
              </div>
              <input 
                type="file" 
                ref="fileInput" 
                @change="handleFileSelect" 
                multiple 
                accept="image/*"
                style="display: none"
              >
            </div>

            <!-- Image URL Input as Alternative -->
            <div class="url-input-section">
              <label for="imageUrl">Or add image URL:</label>
              <div class="url-input-group">
                <input 
                  type="url" 
                  id="imageUrl" 
                  v-model="imageUrl" 
                  placeholder="https://example.com/image.jpg"
                >
                <button type="button" @click="addImageUrl" class="add-url-btn">Add</button>
              </div>
            </div>

            <!-- Image Preview -->
            <div v-if="item.images.length > 0" class="image-preview-grid">
              <div v-for="(image, index) in item.images" :key="index" class="image-preview">
                <img :src="image" :alt="`Preview ${index + 1}`">
                <button type="button" @click="removeImage(index)" class="remove-image-btn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Wishlist Section -->
        <section class="form-section">
          <h2>What I'm Looking For (Optional)</h2>
          <div class="wishlist-container">
            <div class="wishlist-input">
              <input 
                type="text" 
                v-model="wishlistItem" 
                placeholder="e.g., iPhone, Guitar, Books..."
                @keyup.enter="addWishlistItem"
              >
              <button type="button" @click="addWishlistItem" class="add-wishlist-btn">Add</button>
            </div>
            
            <div v-if="item.wishlist.length > 0" class="wishlist-tags">
              <span v-for="(wish, index) in item.wishlist" :key="index" class="wishlist-tag">
                {{ wish }}
                <button type="button" @click="removeWishlistItem(index)">
                  <i class="fas fa-times"></i>
                </button>
              </span>
            </div>
          </div>
        </section>

        <!-- Error Display -->
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          {{ error }}
        </div>

        <!-- Success Display -->
        <div v-if="success" class="success-message">
          <i class="fas fa-check-circle"></i>
          {{ success }}
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" @click="saveDraft" class="btn-secondary" :disabled="submitting">
            <i class="fas fa-save"></i>
            Save Draft
          </button>
          <button type="submit" class="btn-primary" :disabled="submitting || !isFormValid">
            <i class="fas fa-plus" v-if="!submitting"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
            {{ submitting ? 'Adding Item...' : 'Add Item' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createItem } from '@/services/itemService';

export default {
  name: 'AddItemView',
  data() {
    return {
      item: {
        title: '',
        category: '',
        condition: '',
        description: '',
        estimatedValue: '',
        location: '',
        images: [],
        wishlist: []
      },
      imageUrl: '',
      wishlistItem: '',
      submitting: false,
      error: null,
      success: null
    }
  },
  computed: {
    isFormValid() {
      return this.item.title && 
             this.item.category && 
             this.item.condition && 
             this.item.description && 
             this.item.estimatedValue && 
             this.item.location;
    }
  },
  mounted() {
    // Load draft if exists
    this.loadDraft();
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      this.processFiles(files);
    },
    
    handleDrop(event) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.processFiles(files);
    },
    
    processFiles(files) {
      files.forEach(file => {
        if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.item.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select valid image files under 5MB');
        }
      });
    },
    
    addImageUrl() {
      if (this.imageUrl && this.isValidUrl(this.imageUrl)) {
        this.item.images.push(this.imageUrl);
        this.imageUrl = '';
      } else {
        alert('Please enter a valid image URL');
      }
    },
    
    isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    },
    
    removeImage(index) {
      this.item.images.splice(index, 1);
    },
    
    addWishlistItem() {
      if (this.wishlistItem.trim() && !this.item.wishlist.includes(this.wishlistItem.trim())) {
        this.item.wishlist.push(this.wishlistItem.trim());
        this.wishlistItem = '';
      }
    },
    
    removeWishlistItem(index) {
      this.item.wishlist.splice(index, 1);
    },
    
    async submitItem() {
      if (!this.isFormValid) return;
      
      try {
        this.submitting = true;
        this.error = null;
        this.success = null;

        // Prepare item data
        const itemData = {
          title: this.item.title,
          description: this.item.description,
          category: this.item.category,
          condition: this.item.condition,
          estimatedValue: parseFloat(this.item.estimatedValue),
          location: this.item.location,
          images: this.item.images,
          wishlist: this.item.wishlist,
          status: 'Available'
        };

        // Create item via API
        const newItem = await createItem(itemData);
        
        this.success = 'Item added successfully!';
        
        // Clear draft
        this.clearDraft();
        
        // Redirect to my items after a short delay
        setTimeout(() => {
          this.$router.push('/dashboard/my-items');
        }, 2000);
        
      } catch (error) {
        this.error = error.message || 'Failed to add item. Please try again.';
        console.error('Error adding item:', error);
      } finally {
        this.submitting = false;
      }
    },
    
    saveDraft() {
      localStorage.setItem('itemDraft', JSON.stringify(this.item));
      alert('Draft saved!');
    },
    
    loadDraft() {
      const draft = localStorage.getItem('itemDraft');
      if (draft) {
        try {
          this.item = { ...this.item, ...JSON.parse(draft) };
        } catch (e) {
          console.error('Error loading draft:', e);
        }
      }
    },
    
    clearDraft() {
      localStorage.removeItem('itemDraft');
    }
  }
}
</script>

<style lang="scss" scoped>
.add-item-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .header-content {
    h1 {
      font-size: 1.75rem;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }
    
    p {
      color: #666;
      margin: 0;
    }
  }
  
  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 215, 0, 0.2);
      transform: translateX(-2px);
    }
  }
}

.add-item-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.item-form {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2.5rem;
  
  &:last-of-type {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f8f9fa;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
  
  label {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  input, select, textarea {
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #FFD700;
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
    }
    
    &:invalid {
      border-color: #FF6B6B;
    }
  }
  
  small {
    margin-top: 0.25rem;
    color: #666;
    font-size: 0.8rem;
  }
}

.images-container {
  .upload-zone {
    border: 2px dashed #ddd;
    border-radius: 12px;
    padding: 3rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1.5rem;
    
    &:hover {
      border-color: #FFD700;
      background: rgba(255, 215, 0, 0.05);
    }
    
    i {
      font-size: 3rem;
      color: #ddd;
      margin-bottom: 1rem;
      display: block;
    }
    
    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 0.5rem;
    }
    
    small {
      color: #999;
    }
  }
  
  .url-input-section {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .url-input-group {
      display: flex;
      gap: 0.75rem;
      
      input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        
        &:focus {
          outline: none;
          border-color: #FFD700;
        }
      }
      
      .add-url-btn {
        padding: 0.75rem 1.5rem;
        background: #FFD700;
        color: #1a1a1a;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: darken(#FFD700, 10%);
        }
      }
    }
  }
  
  .image-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    
    .image-preview {
      position: relative;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .remove-image-btn {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 24px;
        height: 24px;
        background: rgba(255, 107, 107, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        
        &:hover {
          background: #FF6B6B;
        }
      }
    }
  }
}

.wishlist-container {
  .wishlist-input {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
    
    input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      
      &:focus {
        outline: none;
        border-color: #FFD700;
      }
    }
    
    .add-wishlist-btn {
      padding: 0.75rem 1.5rem;
      background: #FFD700;
      color: #1a1a1a;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: darken(#FFD700, 10%);
      }
    }
  }
  
  .wishlist-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .wishlist-tag {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      background: rgba(255, 215, 0, 0.1);
      color: #FFD700;
      border-radius: 20px;
      font-size: 0.9rem;
      
      button {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        
        &:hover {
          color: #FF6B6B;
        }
      }
    }
  }
}

.error-message, .success-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.error-message {
  background: rgba(255, 107, 107, 0.1);
  color: #FF6B6B;
  border: 1px solid rgba(255, 107, 107, 0.2);
}

.success-message {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f8f9fa;
  
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  .btn-secondary {
    background: rgba(108, 117, 125, 0.1);
    color: #6c757d;
    border: 1px solid rgba(108, 117, 125, 0.2);
    
    &:hover:not(:disabled) {
      background: rgba(108, 117, 125, 0.2);
    }
  }
  
  .btn-primary {
    background: #FFD700;
    color: #1a1a1a;
    border: none;
    
    &:hover:not(:disabled) {
      background: darken(#FFD700, 10%);
      transform: translateY(-1px);
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    .back-btn {
      align-self: flex-start;
    }
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
  
  .wishlist-input {
    flex-direction: column;
    
    .add-wishlist-btn {
      align-self: flex-start;
    }
  }
}
</style>