
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
      <!-- Left Column -->
      <div class="profile-column">
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

        <!-- Trade Preferences -->
        <section class="profile-section">
          <h2>Trade Preferences</h2>
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
            <p class="range-value">{{ profile.tradeRadius }} km</p>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="profile-column">
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

        <!-- Notification Settings -->
        <section class="profile-section">
          <h2>Notification Settings</h2>
          <div class="notification-options">
            <label class="toggle-switch">
              <input type="checkbox" v-model="profile.notifications.email">
              <span class="toggle-slider"></span>
              Email Notifications
            </label>
            
            <label class="toggle-switch">
              <input type="checkbox" v-model="profile.notifications.push">
              <span class="toggle-slider"></span>
              Push Notifications
            </label>
            
            <label class="toggle-switch">
              <input type="checkbox" v-model="profile.notifications.trades">
              <span class="toggle-slider"></span>
              Trade Updates
            </label>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        avatar: null,
        tradeRadius: 25,
        interests: [],
        notifications: {
          email: true,
          push: false,
          trades: true
        }
      },
      originalProfile: null,
      categories: [
        { id: 1, name: 'Electronics', icon: 'fas fa-laptop' },
        { id: 2, name: 'Clothing', icon: 'fas fa-tshirt' },
        { id: 3, name: 'Books', icon: 'fas fa-book' },
        { id: 4, name: 'Home', icon: 'fas fa-home' },
        { id: 5, name: 'Sports', icon: 'fas fa-futbol' },
        { id: 6, name: 'Art', icon: 'fas fa-paint-brush' }
      ]
    }
  },
  methods: {
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.profile.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    },
    saveChanges() {
      // Update profile in Vuex store
      const profileData = {
        name: this.profile.name,
        email: this.profile.email,
        location: this.profile.location,
        bio: this.profile.bio,
        avatar: this.profile.avatar
      };
      
      this.$store.dispatch('user/updateProfile', profileData)
        .then(success => {
          if (success) {
            // Also update localStorage for offline access
            localStorage.setItem('userProfile', JSON.stringify(this.profile));
            
            // Update the original profile to reset the hasChanges computed property
            this.originalProfile = JSON.parse(JSON.stringify(this.profile));
            
            alert('Profile updated successfully!');
          } else {
            alert('Failed to update profile. Please try again.');
          }
        });
    }
  },
  watch: {
    profile: {
      handler() {
        // This will fire whenever the profile object changes
      },
      deep: true
    }
  },
  computed: {
    hasChanges() {
      if (!this.originalProfile) return false
      return JSON.stringify(this.profile) !== JSON.stringify(this.originalProfile)
    }
  },
  mounted() {
    // Always fetch user profile
    this.$store.dispatch('user/fetchUserProfile');
    
    // Get profile from store
    const storeProfile = this.$store.getters['user/userProfile'];
    
    // Merge store profile with default values
    if (storeProfile) {
      this.profile = {
        ...this.profile,
        name: storeProfile.name || '',
        email: storeProfile.email || '',
        location: storeProfile.location || '',
        bio: storeProfile.bio || '',
        avatar: storeProfile.avatar || null,
        interests: storeProfile.interests || []
      };
    }
    
    // Create a deep copy of the profile for change detection
    this.originalProfile = JSON.parse(JSON.stringify(this.profile));
  }
}
</script>

<style lang="scss" scoped>
.profile-view {
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  background: white;
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  h1 {
    font-size: 1.6rem;
    color: #2c3e50;
    margin-bottom: 0;
  }
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  background: #FFD700;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: darken(#FFD700, 10%);
  }

  &:disabled {
    background: #ddd;
    color: #999;
    cursor: not-allowed;
  }
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
}

.profile-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-section {
  background: white;
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 100%;

  h2 {
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 1.2rem;
  }
}

.avatar-section {
  text-align: center;
}

.avatar-container {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto 0.75rem;
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
    font-size: 1.25rem;
  }
}

.hidden {
  display: none;
}

.avatar-help {
  color: #666;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.form-group {
  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    display: block;
    margin-bottom: 0.4rem;
    color: #666;
    font-size: 0.8rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #FFD700;
    }
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  max-height: 200px;
  overflow-y: auto;
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
    padding: 0.4rem 0.8rem;
    background: #f8f9fa;
    border-radius: 6px;
    transition: all 0.3s ease;
    font-size: 0.85rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    i {
      color: #666;
      flex-shrink: 0;
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
  -moz-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
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
  margin-top: 0.4rem;
  color: #666;
  font-size: 0.8rem;
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;

  input {
    display: none;
  }

  .toggle-slider {
    position: relative;
    width: 44px;
    height: 24px;
    background: #ddd;
    border-radius: 12px;
    transition: background 0.3s ease;
    flex-shrink: 0;

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
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
      transform: translateX(20px);
    }
  }
}

// Large Desktop Responsiveness
@media (min-width: 1921px) {
  .profile-view {
    max-width: 1600px;
    margin: 0 auto;
  }
}

// Desktop Responsiveness
@media (min-width: 1201px) and (max-width: 1920px) {
  .profile-view {
    width: 100%;
  }
}

// Tablet Responsiveness
@media (min-width: 992px) and (max-width: 1200px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    gap: 1rem;
  }

  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    max-height: 150px;
  }

  .profile-section {
    padding: 1rem;
  }

  .profile-header h1 {
    font-size: 1.4rem;
  }
}

// Mobile Responsiveness
@media (max-width: 991px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    .save-btn {
      width: 100%;
      justify-content: center;
    }
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    .categories-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>