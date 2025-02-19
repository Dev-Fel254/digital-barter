<template>
  <div class="about page-content">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-3">
          <div class="categories-sidebar">
            <h2 class="sidebar-title">Categories</h2>
            <ul class="category-list">
              <li><a href="#">Clothing <span>8</span></a></li>
              <li><a href="#">Home & Kitchen <span>5</span></a></li>
              <li><a href="#">Books & Comics <span>5</span></a></li>
              <li><a href="#">Jewelry & Watches <span>3</span></a></li>
              <li><a href="#">Automotive <span>2</span></a></li>
              <li><a href="#">Furniture <span>4</span></a></li>
              <li><a href="#">TV, Video & Audio <span>2</span></a></li>
              <li><a href="#">Mobile Phones <span>3</span></a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="content-section">
            <h1 class="gradient-text">About Us</h1>
            <h2 class="subtitle">We're not just a website, we're a community!</h2>
            
            <div class="feature-points">
              <p class="highlight">Have items you no longer need? List them for sale or swap!</p>
              <p class="highlight">Know items you want? Create a "Wish" for other members to know!</p>
            </div>

            <div class="main-content">
              <p>Many people today struggle when deciding what to do with items they no longer have use for. These items are usually trashed or totally disregarded. We recognized that there was indeed a place in today's economy for those looking to recycle, exchange and barter.</p>

              <p>Our staff is fully committed to ensuring that every user in our community is catered to. In addition, our staff is constantly conversing amongst each other sharing new ideas and thoughts to accommodate you. We'd love to hear your ideas and thoughts too! We hope that you enjoy our site and all of the benefits it brings to you!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style lang="scss" scoped>
.about {
  background-color: #fafafa;
}

.categories-sidebar {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .sidebar-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.75rem;

      a {
        display: flex;
        justify-content: space-between;
        color: #4a5568;
        text-decoration: none;
        padding: 0.5rem 0;
        transition: all 0.3s ease;

        span {
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 600;
        }

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

.content-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #4a5568;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .feature-points {
    margin-bottom: 2rem;

    .highlight {
      font-size: 1.1rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
      padding-left: 1rem;
      border-left: 3px solid var(--secondary-color);
    }
  }

  .main-content {
    p {
      font-size: 1rem;
      line-height: 1.7;
      color: #4a5568;
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .categories-sidebar {
    margin-bottom: 2rem;
  }
}
</style>