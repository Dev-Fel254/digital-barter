
<template>
  <div class="profile-view">
    <header class="profile-header">
      <h1>Profile Settings</h1>
      <button class="save-btn" @click="saveChanges" :disabled="!hasChanges">
        <i class="fas fa-save"></i>
        Save Changes
      </button>
    </header>

    <!-- Profile Sections -->
    <div class="profile-grid">
      <!-- Avatar Section -->
      <section class="profile-section avatar-section">
        <div class="avatar-container">
          <img 
            :src="profile.avatar || '/default-avatar.png'" 
            :alt="profile.name"
            class="profile-avatar"
          >
          <div class="avatar-overlay">
            <label for="avatar-upload" class="upload-btn">
              <i class="fas fa-camera"></i>
              Change Photo
            </label>
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*"
              @change="handleAvatarUpload"
              class="hidden"
            >
          </div>
        </div>
        <p class="avatar-help">Click to upload a new photo</p>
      </section>

      <!-- Personal Information -->
      <section class="profile-section">
        <h2>Personal Information</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="profile.name"
              placeholder="Your full name"
            >
          </div>
          
          <div class="form-group">
            <label for="location">Location</label>
            <input 
              type="text" 
              id="location" 
              v-model="profile.location"
              placeholder="City, Country"
            >
          </div>

          <div class="form-group full-width">
            <label for="bio">Bio</label>
            <textarea 
              id="bio" 
              v-model="profile.bio"
              placeholder="Tell others about yourself"
              rows="3"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <section class="profile-section">
        <h2>Contact Information</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="profile.email"
              placeholder="your@email.com"
            >
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="profile.phone"
              placeholder="+1234567890"
            >
          </div>
        </div>
      </section>

      <!-- Trade Preferences -->
      <section class="profile-section">
        <h2>Trade Preferences</h2>
        <div class="form-grid">
          <div class="form-group full-width">
            <label>Interested Categories</label>
            <div class="categories-grid">
              <label 
                v-for="category in categories" 
                :key="category.id" 
                class="category-checkbox"
              >
                <input 
                  type="checkbox" 
                  v-model="profile.interests"
                  :value="category.id"
                >
                <span class="checkbox-label">
                  <i :class="category.icon"></i>
                  {{ category.name }}
                </span>
              </label>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="trade-radius">Trade Radius (km)</label>
            <input 
              type="range" 
              id="trade-radius" 
              v-model="profile.tradeRadius"
              min="1" 
              max="100"
              class="range-slider"
            >
            <div class="range-value">{{ profile.tradeRadius }}km</div>
          </div>
        </div>
      </section>

      <!-- Notification Settings -->
      <section class="profile-section">
        <h2>Notification Settings</h2>
        <div class="form-grid">
          <div class="form-group full-width">
            <div class="notification-options">
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  v-model="profile.notifications.email"
                >
                <span class="toggle-slider"></span>
                Email Notifications
              </label>

              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  v-model="profile.notifications.push"
                >
                <span class="toggle-slider"></span>
                Push Notifications
              </label>

              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  v-model="profile.notifications.trades"
                >
                <span class="toggle-slider"></span>
                Trade Updates
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      hasChanges: false,
      profile: {
        name: 'John Doe',
        avatar: null,
        location: 'Nairobi, Kenya',
        bio: '',
        email: 'john@example.com',
        phone: '',
        interests: [],
        tradeRadius: 50,
        notifications: {
          email: true,
          push: true,
          trades: true
        }
      },
      categories: [
        { id: 1, name: 'Electronics', icon: 'fas fa-laptop' },
        { id: 2, name: 'Fashion', icon: 'fas fa-tshirt' },
        { id: 3, name: 'Books', icon: 'fas fa-book' },
        { id: 4, name: 'Sports', icon: 'fas fa-futbol' },
        { id: 5, name: 'Art', icon: 'fas fa-palette' },
        { id: 6, name: 'Home', icon: 'fas fa-home' }
      ]
    }
  },
  methods: {
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.profile.avatar = e.target.result
          this.hasChanges = true
        }
        reader.readAsDataURL(file)
      }
    },
    async saveChanges() {
      try {
        // TODO: Implement API call to save profile changes
        console.log('Saving profile:', this.profile)
        this.hasChanges = false
        // Show success message
      } catch (error) {
        console.error('Error saving profile:', error)
        // Show error message
      }
    }
  },
  watch: {
    profile: {
      handler() {
        this.hasChanges = true
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #2c3e50;
  }
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #FF6B6B;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: darken(#FF6B6B, 10%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.profile-grid {
  display: grid;
  gap: 2rem;
}

.profile-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
}

.avatar-section {
  text-align: center;
}

.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  
  &:hover .avatar-overlay {
    opacity: 1;
  }
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.upload-btn {
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.5rem;
  }
}

.hidden {
  display: none;
}

.avatar-help {
  color: #666;
  font-size: 0.875rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
    font-size: 0.875rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #FFD700;
    }
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.category-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input[type="checkbox"] {
    display: none;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;

    i {
      color: #666;
    }
  }

  input[type="checkbox"]:checked + .checkbox-label {
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;

    i {
      color: #FFD700;
    }
  }
}

.range-slider {
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #FFD700;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: darken(#FFD700, 10%);
    }
  }
}

.range-value {
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  input {
    display: none;
  }

  .toggle-slider {
    position: relative;
    width: 50px;
    height: 26px;
    background: #ddd;
    border-radius: 13px;
    transition: background 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background: white;
      transition: transform 0.3s ease;
    }
  }

  input:checked + .toggle-slider {
    background: #FFD700;

    &::before {
      transform: translateX(24px);
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    .save-btn {
      width: 100%;
      justify-content: center;
    }
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}
</style>