<template>
  <div class="help page-content">
    <div class="container py-4">
      <div class="help-wrapper">
        <h1 class="gradient-text">Help</h1>
        
        <div class="help-sections">
          <div class="help-section">
            <h2>Account</h2>
            <ul class="help-links">
              <li>
                <router-link to="/help/register">
                  <i class="fas fa-user-plus"></i>
                  Register with Eswaps
                </router-link>
              </li>
              <li>
                <router-link to="/help/login">
                  <i class="fas fa-sign-in-alt"></i>
                  Logging in
                </router-link>
              </li>
              <li>
                <router-link to="/help/profile">
                  <i class="fas fa-user-edit"></i>
                  Edit Profile
                </router-link>
              </li>
            </ul>
          </div>

          <div class="help-section">
            <h2>Basics</h2>
            <ul class="help-links">
              <li>
                <router-link to="/help/how-it-works">
                  <i class="fas fa-info-circle"></i>
                  How Does the Website Work?
                </router-link>
              </li>
              <li>
                <router-link to="/help/features">
                  <i class="fas fa-star"></i>
                  Features
                </router-link>
              </li>
              <li>
                <router-link to="/help/manage-sale">
                  <i class="fas fa-tags"></i>
                  Manage Sale
                </router-link>
              </li>
              <li>
                <router-link to="/help/manage-swap">
                  <i class="fas fa-exchange-alt"></i>
                  Manage Swap
                </router-link>
              </li>
              <li>
                <router-link to="/help/manage-wish">
                  <i class="fas fa-heart"></i>
                  Manage Wish
                </router-link>
              </li>
            </ul>
          </div>

          <div class="help-section">
            <h2>Addons</h2>
            <ul class="help-links">
              <li>
                <router-link to="/help/sell-item">
                  <i class="fas fa-dollar-sign"></i>
                  How to sell an item with Eswaps
                </router-link>
              </li>
              <li>
                <router-link to="/help/swap-item">
                  <i class="fas fa-sync"></i>
                  How to swap an item with eSwap
                </router-link>
              </li>
              <li>
                <router-link to="/help/add-to-wishlist">
                  <i class="fas fa-list"></i>
                  How to Add an Item to the Wish List
                </router-link>
              </li>
              <li>
                <router-link to="/help/manage-offers">
                  <i class="fas fa-handshake"></i>
                  Manage Offers
                </router-link>
              </li>
              <li>
                <router-link to="/help/manage-feedback">
                  <i class="fas fa-comments"></i>
                  Manage Feedback
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpView'
}
</script>

<style lang="scss" scoped>
.help {
  background-color: #fafafa;
}

.help-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.help-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.help-section {
  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1.5rem;
    font-weight: 600;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }
}

.help-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      display: flex;
      align-items: center;
      color: #4a5568;
      text-decoration: none;
      padding: 0.75rem;
      border-radius: 6px;
      transition: all 0.3s ease;

      i {
        width: 24px;
        margin-right: 0.75rem;
        color: var(--primary-color);
        transition: all 0.3s ease;
      }

      &:hover {
        background: rgba(255, 215, 0, 0.05);
        color: var(--primary-color);

        i {
          color: var(--secondary-color);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .help-wrapper {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .help-section {
    h2 {
      font-size: 1.25rem;
    }
  }
}
</style>