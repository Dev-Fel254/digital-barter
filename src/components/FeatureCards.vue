<template>
  <section class="feature-cards">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 col-sm-6">
          <div class="feature-card wish-card">
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-heart"></i>
              </div>
              <div class="card-text">
                <h3>WISH</h3>
                <p>Have something in mind but don't see it on the site? Make a "Wish" to share it with other site members!</p>
              </div>
              <router-link to="/wish" class="btn btn-primary gradient-bg">ADD WISH</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6">
          <div class="feature-card swap-card">
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="card-text">
                <h3>SWAP</h3>
                <p>Clean your house or business by listing items. Swap them for those you need!</p>
              </div>
              <router-link to="/swap" class="btn btn-primary gradient-bg">ADD ITEM FOR SWAP</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeatureCards'
}
</script>

<style lang="scss" scoped>
.feature-cards {
  padding: 1rem 0;

  .feature-card {
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: left;
    height: 100%;
    max-width: 320px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 215, 0, 0.1);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      opacity: 0.7;
    }

    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      background: linear-gradient(145deg, #ffffff, #f0f2f5);
      
      &::before {
        opacity: 1;
      }
    }

    .card-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      z-index: 1;
    }

    .card-icon {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      
      i {
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
      }
    }

    .card-text {
      flex-grow: 1;
    }

    h3 {
      color: var(--text-color);
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
      position: relative;
      display: inline-block;
    }

    p {
      color: #4a5568;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .btn {
      border: none;
      padding: 0.5rem 1rem;
      color: white;
      font-size: 0.9rem;
      width: fit-content;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  }

  // Add some spacing between cards on mobile
  .col-md-4 {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 768px) {
    .col-md-4 {
      margin-bottom: 0;
    }
  }
}
</style>